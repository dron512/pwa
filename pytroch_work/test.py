import IPython.display
import PIL.Image
import cv2
import ffmpeg
import imageio
import io
import ipywidgets
import numpy
import os.path
import requests
import skimage.transform
import warnings
from base64 import b64encode
import sys
sys.path.append('first-order-model')
from demo import load_checkpoints, make_animation
from google.colab import files, output
from IPython.display import HTML, Javascript
from shutil import copyfileobj
from skimage import img_as_ubyte
from tempfile import NamedTemporaryFile
from tqdm.auto import tqdm
warnings.filterwarnings("ignore")
os.makedirs("user", exist_ok=True)

display(HTML("""
<style>
.widget-box > * {
	flex-shrink: 0;
}
.widget-tab {
	min-width: 0;
	flex: 1 1 auto;
}
.widget-tab .p-TabBar-tabLabel {
	font-size: 15px;
}
.widget-upload {
	background-color: tan;
}
.widget-button {
	font-size: 18px;
	width: 160px;
	height: 34px;
	line-height: 34px;
}
.widget-dropdown {
	width: 250px;
}
.widget-checkbox {
	width: 650px;
}
.widget-checkbox + .widget-checkbox {
	margin-top: -6px;
}
.input-widget .output_html {
	text-align: center;
	width: 266px;
	height: 266px;
	line-height: 266px;
	color: lightgray;
	font-size: 72px;
}
.title {
	font-size: 20px;
	font-weight: bold;
	margin: 12px 0 6px 0;
}
.warning {
	display: none;
	color: red;
	margin-left: 10px;
}
.warn {
	display: initial;
}
.resource {
	cursor: pointer;
	border: 1px solid gray;
	margin: 5px;
	width: 160px;
	height: 160px;
	min-width: 160px;
	min-height: 160px;
	max-width: 160px;
	max-height: 160px;
	-webkit-box-sizing: initial;
	box-sizing: initial;
}
.resource:hover {
	border: 6px solid crimson;
	margin: 0;
}
.selected {
	border: 6px solid seagreen;
	margin: 0;
}
.input-widget {
	width: 266px;
	height: 266px;
	border: 1px solid gray;
}
.input-button {
	width: 268px;
	font-size: 15px;
	margin: 2px 0 0;
}
.output-widget {
	width: 256px;
	height: 256px;
	border: 1px solid gray;
}
.output-button {
	width: 258px;
	font-size: 15px;
	margin: 2px 0 0;
}
.uploaded {
	width: 256px;
	height: 256px;
	border: 6px solid seagreen;
	margin: 0;
}
.label-or {
	align-self: center;
	font-size: 20px;
	margin: 16px;
}
.loading {
	align-items: center;
	width: fit-content;
}
.loader {
	margin: 32px 0 16px 0;
	width: 48px;
	height: 48px;
	min-width: 48px;
	min-height: 48px;
	max-width: 48px;
	max-height: 48px;
	border: 4px solid whitesmoke;
	border-top-color: gray;
	border-radius: 50%;
	animation: spin 1.8s linear infinite;
}
.loading-label {
	color: gray;
}
.video {
	margin: 0;
}
.comparison-widget {
	width: 256px;
	height: 256px;
	border: 1px solid gray;
	margin-left: 2px;
}
.comparison-label {
	color: gray;
	font-size: 14px;
	text-align: center;
	position: relative;
	bottom: 3px;
}
@keyframes spin {
	from { transform: rotate(0deg); }
	to { transform: rotate(360deg); }
}
</style>
"""))

def thumbnail(file):
	return imageio.get_reader(file, mode='I', format='FFMPEG').get_next_data()

def create_image(i, j):
	image_widget = ipywidgets.Image.from_file('demo/images/%d%d.png' % (i, j))
	image_widget.add_class('resource')
	image_widget.add_class('resource-image')
	image_widget.add_class('resource-image%d%d' % (i, j))
	return image_widget

def create_video(i):
	video_widget = ipywidgets.Image(
		value=cv2.imencode('.png', cv2.cvtColor(thumbnail('demo/videos/%d.mp4' % i), cv2.COLOR_RGB2BGR))[1].tostring(),
		format='png'
	)
	video_widget.add_class('resource')
	video_widget.add_class('resource-video')
	video_widget.add_class('resource-video%d' % i)
	return video_widget

def create_title(title):
	title_widget = ipywidgets.Label(title)
	title_widget.add_class('title')
	return title_widget

def download_output(button):
	complete.layout.display = 'none'
	loading.layout.display = ''
	files.download('output.mp4')
	loading.layout.display = 'none'
	complete.layout.display = ''

def convert_output(button):
	complete.layout.display = 'none'
	loading.layout.display = ''
	ffmpeg.input('output.mp4').output('scaled.mp4', vf='scale=1080x1080:flags=lanczos,pad=1920:1080:420:0').overwrite_output().run()
	files.download('scaled.mp4')
	loading.layout.display = 'none'
	complete.layout.display = ''

def back_to_main(button):
	complete.layout.display = 'none'
	main.layout.display = ''

label_or = ipywidgets.Label('or')
label_or.add_class('label-or')

image_titles = ['Peoples', 'Cartoons', 'Dolls', 'Game of Thrones', 'Statues']
image_lengths = [8, 4, 8, 9, 4]

image_tab = ipywidgets.Tab()
image_tab.children = [ipywidgets.HBox([create_image(i, j) for j in range(length)]) for i, length in enumerate(image_lengths)]
for i, title in enumerate(image_titles):
	image_tab.set_title(i, title)

input_image_widget = ipywidgets.Output()
input_image_widget.add_class('input-widget')
upload_input_image_button = ipywidgets.FileUpload(accept='image/*', button_style='primary')
upload_input_image_button.add_class('input-button')
image_part = ipywidgets.HBox([
	ipywidgets.VBox([input_image_widget, upload_input_image_button]),
	label_or,
	image_tab
])

video_tab = ipywidgets.Tab()
video_tab.children = [ipywidgets.HBox([create_video(i) for i in range(5)])]
video_tab.set_title(0, 'All Videos')

input_video_widget = ipywidgets.Output()
input_video_widget.add_class('input-widget')
upload_input_video_button = ipywidgets.FileUpload(accept='video/*', button_style='primary')
upload_input_video_button.add_class('input-button')
video_part = ipywidgets.HBox([
	ipywidgets.VBox([input_video_widget, upload_input_video_button]),
	label_or,
	video_tab
])

model = ipywidgets.Dropdown(
	description="Model:",
	options=[
		'vox',
		'vox-adv',
		'taichi',
		'taichi-adv',
		'nemo',
		'mgif',
		'fashion',
		'bair'
	]
)
warning = ipywidgets.HTML('<b>Warning:</b> Upload your own images and videos (see README)')
warning.add_class('warning')
model_part = ipywidgets.HBox([model, warning])

relative = ipywidgets.Checkbox(description="Relative keypoint displacement (Inherit object proporions from the video)", value=True)
adapt_movement_scale = ipywidgets.Checkbox(description="Adapt movement scale (Don't touch unless you know want you are doing)", value=True)
generate_button = ipywidgets.Button(description="Generate", button_style='primary')
main = ipywidgets.VBox([
	create_title('Choose Image'),
	image_part,
	create_title('Choose Video'),
	video_part,
	create_title('Settings'),
	model_part,
	relative,
	adapt_movement_scale,
	generate_button
])

loader = ipywidgets.Label()
loader.add_class("loader")
loading_label = ipywidgets.Label("This may take several minutes to process…")
loading_label.add_class("loading-label")
progress_bar = ipywidgets.Output()
loading = ipywidgets.VBox([loader, loading_label, progress_bar])
loading.add_class('loading')

output_widget = ipywidgets.Output()
output_widget.add_class('output-widget')
download = ipywidgets.Button(description='Download', button_style='primary')
download.add_class('output-button')
download.on_click(download_output)
convert = ipywidgets.Button(description='Convert to 1920×1080', button_style='primary')
convert.add_class('output-button')
convert.on_click(convert_output)
back = ipywidgets.Button(description='Back', button_style='primary')
back.add_class('output-button')
back.on_click(back_to_main)

comparison_widget = ipywidgets.Output()
comparison_widget.add_class('comparison-widget')
comparison_label = ipywidgets.Label('Comparison')
comparison_label.add_class('comparison-label')
complete = ipywidgets.HBox([
	ipywidgets.VBox([output_widget, download, convert, back]),
	ipywidgets.VBox([comparison_widget, comparison_label])
])

display(ipywidgets.VBox([main, loading, complete]))
display(Javascript("""
var images, videos;
function deselectImages() {
	images.forEach(function(item) {
		item.classList.remove("selected");
	});
}
function deselectVideos() {
	videos.forEach(function(item) {
		item.classList.remove("selected");
	});
}
function invokePython(func) {
	google.colab.kernel.invokeFunction("notebook." + func, [].slice.call(arguments, 1), {});
}
setTimeout(function() {
	(images = [].slice.call(document.getElementsByClassName("resource-image"))).forEach(function(item) {
		item.addEventListener("click", function() {
			deselectImages();
			item.classList.add("selected");
			invokePython("select_image", item.className.match(/resource-image(\d\d)/)[1]);
		});
	});
	images[0].classList.add("selected");
	(videos = [].slice.call(document.getElementsByClassName("resource-video"))).forEach(function(item) {
		item.addEventListener("click", function() {
			deselectVideos();
			item.classList.add("selected");
			invokePython("select_video", item.className.match(/resource-video(\d)/)[1]);
		});
	});
	videos[0].classList.add("selected");
}, 1000);
"""))

selected_image = None
def select_image(filename):
	global selected_image
	selected_image = resize(PIL.Image.open('demo/images/%s.png' % filename).convert("RGB"))
	input_image_widget.clear_output(wait=True)
	with input_image_widget:
		display(HTML('Image'))
	input_image_widget.remove_class('uploaded')
output.register_callback("notebook.select_image", select_image)

selected_video = None
def select_video(filename):
	global selected_video
	selected_video = 'demo/videos/%s.mp4' % filename
	input_video_widget.clear_output(wait=True)
	with input_video_widget:
		display(HTML('Video'))
	input_video_widget.remove_class('uploaded')
output.register_callback("notebook.select_video", select_video)

def resize(image, size=(256, 256)):
	w, h = image.size
	d = min(w, h)
	r = ((w - d) // 2, (h - d) // 2, (w + d) // 2, (h + d) // 2)
	return image.resize(size, resample=PIL.Image.LANCZOS, box=r)

def upload_image(change):
	global selected_image
	for name, file_info in upload_input_image_button.value.items():
		content = file_info['content']
	if content is not None:
		selected_image = resize(PIL.Image.open(io.BytesIO(content)).convert("RGB"))
		input_image_widget.clear_output(wait=True)
		with input_image_widget:
			display(selected_image)
		input_image_widget.add_class('uploaded')
		display(Javascript('deselectImages()'))
upload_input_image_button.observe(upload_image, names='value')

def upload_video(change):
	global selected_video
	for name, file_info in upload_input_video_button.value.items():
		content = file_info['content']
	if content is not None:
		selected_video = 'user/' + name
		with open(selected_video, 'wb') as video:
			video.write(content)
		preview = resize(PIL.Image.fromarray(thumbnail(selected_video)).convert("RGB"))
		input_video_widget.clear_output(wait=True)
		with input_video_widget:
			display(preview)
		input_video_widget.add_class('uploaded')
		display(Javascript('deselectVideos()'))
upload_input_video_button.observe(upload_video, names='value')

def change_model(change):
	if model.value.startswith('vox'):
		warning.remove_class('warn')
	else:
		warning.add_class('warn')
model.observe(change_model, names='value')

def generate(button):
	main.layout.display = 'none'
	loading.layout.display = ''
	filename = model.value + ('' if model.value == 'fashion' else '-cpk') + '.pth.tar'
	if not os.path.isfile(filename):
		response = requests.get('https://github.com/graphemecluster/first-order-model-demo/releases/download/checkpoints/' + filename, stream=True)
		with progress_bar:
			with tqdm.wrapattr(response.raw, 'read', total=int(response.headers.get('Content-Length', 0)), unit='B', unit_scale=True, unit_divisor=1024) as raw:
				with open(filename, 'wb') as file:
					copyfileobj(raw, file)
		progress_bar.clear_output()
	reader = imageio.get_reader(selected_video, mode='I', format='FFMPEG')
	fps = reader.get_meta_data()['fps']
	driving_video = []
	for frame in reader:
		driving_video.append(frame)
	generator, kp_detector = load_checkpoints(config_path='config/%s-256.yaml' % model.value, checkpoint_path=filename)
	with progress_bar:
		predictions = make_animation(
			skimage.transform.resize(numpy.asarray(selected_image), (256, 256)),
			[skimage.transform.resize(frame, (256, 256)) for frame in driving_video],
			generator,
			kp_detector,
			relative=relative.value,
			adapt_movement_scale=adapt_movement_scale.value
		)
	progress_bar.clear_output()
	imageio.mimsave('output.mp4', [img_as_ubyte(frame) for frame in predictions], fps=fps)
	try:
		with NamedTemporaryFile(suffix='.mp4') as output:
			ffmpeg.output(ffmpeg.input('output.mp4').video, ffmpeg.input(selected_video).audio, output.name, c='copy').run()
			with open('output.mp4', 'wb') as result:
				copyfileobj(output, result)
	except ffmpeg.Error:
		pass
	output_widget.clear_output(True)
	with output_widget:
		video_widget = ipywidgets.Video.from_file('output.mp4', autoplay=False, loop=False)
		video_widget.add_class('video')
		video_widget.add_class('video-left')
		display(video_widget)
	comparison_widget.clear_output(True)
	with comparison_widget:
		video_widget = ipywidgets.Video.from_file(selected_video, autoplay=False, loop=False, controls=False)
		video_widget.add_class('video')
		video_widget.add_class('video-right')
		display(video_widget)
	display(Javascript("""
	setTimeout(function() {
		(function(left, right) {
			left.addEventListener("play", function() {
				right.play();
			});
			left.addEventListener("pause", function() {
				right.pause();
			});
			left.addEventListener("seeking", function() {
				right.currentTime = left.currentTime;
			});
			right.muted = true;
		})(document.getElementsByClassName("video-left")[0], document.getElementsByClassName("video-right")[0]);
	}, 1000);
	"""))
	loading.layout.display = 'none'
	complete.layout.display = ''

generate_button.on_click(generate)

loading.layout.display = 'none'
complete.layout.display = 'none'
select_image('00')
select_video('0')
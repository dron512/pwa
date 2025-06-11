import subprocess
from PIL import Image
import imageio
import os

SOURCE_IMAGE = "aa.jpg"
DRIVING_VIDEO = "driving_video.mp4"
OUTPUT_PATH = "result.mp4"


def run_fomm():
    # Run FOMM demo using command line (weights required separately)
    subprocess.run([
        "python", "demo.py",
        "--config", "config/vox-256.yaml",
        "--driving_video", f"../{DRIVING_VIDEO}",
        "--source_image", f"../{SOURCE_IMAGE}",
        "--checkpoint", "checkpoints/vox-cpk.pth.tar",
        "--relative",
        "--adapt_scale",
        "--result_video", f"../{OUTPUT_PATH}",
        "--cpu"
    ], cwd="first-order-model")


if __name__ == "__main__":
    if not os.path.exists("first-order-model"):
        raise RuntimeError("first-order-model 폴더가 없습니다. git clone 필요")

    run_fomm()
    print("✅ 영상 생성 완료:", OUTPUT_PATH)

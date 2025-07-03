using Emgu.CV;
using Emgu.CV.Structure;
using System;
using System.Drawing;
using System.Windows.Forms;

namespace WinFormsApp2
{
    public partial class Form1 : Form
    {
        private VideoCapture _capture;
        private bool _isFilterActive = false;
        private string _currentFilter = "None";
        private System.Windows.Forms.Timer countdownTimer;
        private int countdownValue = 3;
        private bool isCountingDown = false;
        private System.Windows.Forms.Timer flashTimer;
        private bool isFlashing = false;

        public Form1()
        {
            InitializeComponent();
            InitCamera();
            SetupButtonEvents();
            SetupCountdownTimer();
            SetupFlashTimer();
        }

        private void SetupFlashTimer()
        {
            flashTimer = new System.Windows.Forms.Timer();
            flashTimer.Interval = 100; // 0.1초 간격으로 깜빡임
            flashTimer.Tick += FlashTimer_Tick;
        }

        private void FlashTimer_Tick(object sender, EventArgs e)
        {
            if (isFlashing)
            {
                countdownLabel.BackColor = Color.FromArgb(0, 0, 0, 128);
                isFlashing = false;
            }
            else
            {
                countdownLabel.BackColor = Color.FromArgb(255, 0, 0, 128);
                isFlashing = true;
            }
        }

        private void SetupCountdownTimer()
        {
            countdownTimer = new System.Windows.Forms.Timer();
            countdownTimer.Interval = 1000; // 1초 간격
            countdownTimer.Tick += CountdownTimer_Tick;
        }

        private void CountdownTimer_Tick(object sender, EventArgs e)
        {
            if (countdownValue > 0)
            {
                countdownLabel.Text = countdownValue.ToString();
                countdownLabel.Font = new Font("맑은 고딕", 48F, FontStyle.Bold);
                countdownValue--;
            }
            else
            {
                countdownTimer.Stop();
                flashTimer.Stop();
                countdownLabel.Visible = false;
                isCountingDown = false;
                startButton.Enabled = true;
                TakePicture();
            }
        }

        private void SetupButtonEvents()
        {
            button1.Text = "화사하게";
            button2.Text = "어둡게";
            button3.Text = "잡티제거";
            button4.Text = "원래대로";

            button1.Click += (s, e) => ApplyFilter("Bright");
            button2.Click += (s, e) => ApplyFilter("Dark");
            button3.Click += (s, e) => ApplyFilter("NoiseRemoval");
            button4.Click += (s, e) => ApplyFilter("None");

            startButton.Click += StartButton_Click;
        }

        private void StartButton_Click(object sender, EventArgs e)
        {
            if (!isCountingDown)
            {
                isCountingDown = true;
                startButton.Enabled = false;
                countdownValue = 3;
                countdownLabel.Visible = true;
                countdownLabel.Text = countdownValue.ToString();
                countdownLabel.Font = new Font("맑은 고딕", 48F, FontStyle.Bold);
                countdownTimer.Start();
                flashTimer.Start();
            }
        }

        private void TakePicture()
        {
            if (pictureBox1.Image != null)
            {
                // 현재 필터가 적용된 이미지를 오른쪽 PictureBox에 표시
                pictureBox2.Image = pictureBox1.Image;
            }
        }

        private void ApplyFilter(string filterType)
        {
            _currentFilter = filterType;
            _isFilterActive = true;
        }

        private void ProcessFrame(object sender, EventArgs e)
        {
            Mat frame = new Mat();
            _capture.Retrieve(frame);

            if (!frame.IsEmpty)
            {
                var image = frame.ToImage<Bgr, byte>();

                if (_isFilterActive)
                {
                    switch (_currentFilter)
                    {
                        case "Bright":
                            // 밝기 증가
                            image = image.Add(new Bgr(30, 30, 30));
                            break;
                        case "Dark":
                            // 어둡게
                            image = image.Mul(0.7);
                            break;
                        case "NoiseRemoval":
                            // 노이즈 제거
                            image = image.SmoothGaussian(3);  // 가우시안 블러로 노이즈 제거
                            // 선명도 향상
                            var sharpened = image.Copy();
                            sharpened = sharpened.SmoothGaussian(3);
                            image = image.Add(image.Sub(sharpened).Mul(0.5));  // 언샤프 마스킹
                            break;
                        case "None":
                            // 원본
                            break;
                    }
                }

                pictureBox1.Image = image.ToBitmap();
            }
        }

        private void InitCamera()
        {
            for (int i = 0; i < 5; i++)
            {
                try
                {
                    using (var cap = new VideoCapture(i))
                    {
                        if (cap.IsOpened)
                        {
                            Console.WriteLine($"Camera found at index {i}");
                        }
                    }
                }
                catch
                {
                    //
                }
            }

            try
            {
                _capture = new VideoCapture(0); // 0 ⺻ ķ
                _capture.ImageGrabbed += ProcessFrame;

                timer1.Interval = 30; // 30fps
                timer1.Tick += (s, e) => _capture.Grab();
                timer1.Start();
            }
            catch (Exception ex)
            {
                MessageBox.Show($"ī޶: {ex.Message}");
            }
        }

        protected override void OnFormClosing(FormClosingEventArgs e)
        {
            timer1.Stop();
            _capture?.Dispose();
            base.OnFormClosing(e);
        }
    }
}



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
            flashTimer.Interval = 100; // 0.1�� �������� ������
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
            countdownTimer.Interval = 1000; // 1�� ����
            countdownTimer.Tick += CountdownTimer_Tick;
        }

        private void CountdownTimer_Tick(object sender, EventArgs e)
        {
            if (countdownValue > 0)
            {
                countdownLabel.Text = countdownValue.ToString();
                countdownLabel.Font = new Font("���� ���", 48F, FontStyle.Bold);
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
            button1.Text = "ȭ���ϰ�";
            button2.Text = "��Ӱ�";
            button3.Text = "��Ƽ����";
            button4.Text = "�������";

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
                countdownLabel.Font = new Font("���� ���", 48F, FontStyle.Bold);
                countdownTimer.Start();
                flashTimer.Start();
            }
        }

        private void TakePicture()
        {
            if (pictureBox1.Image != null)
            {
                // ���� ���Ͱ� ����� �̹����� ������ PictureBox�� ǥ��
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
                            // ��� ����
                            image = image.Add(new Bgr(30, 30, 30));
                            break;
                        case "Dark":
                            // ��Ӱ�
                            image = image.Mul(0.7);
                            break;
                        case "NoiseRemoval":
                            // ������ ����
                            image = image.SmoothGaussian(3);  // ����þ� ���� ������ ����
                            // ���� ���
                            var sharpened = image.Copy();
                            sharpened = sharpened.SmoothGaussian(3);
                            image = image.Add(image.Sub(sharpened).Mul(0.5));  // ����� ����ŷ
                            break;
                        case "None":
                            // ����
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
                _capture = new VideoCapture(0); // 0 ? ?
                _capture.ImageGrabbed += ProcessFrame;

                timer1.Interval = 30; // 30fps
                timer1.Tick += (s, e) => _capture.Grab();
                timer1.Start();
            }
            catch (Exception ex)
            {
                MessageBox.Show($"??: {ex.Message}");
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



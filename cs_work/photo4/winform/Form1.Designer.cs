using System.Drawing;
using System.Windows.Forms;

namespace WinFormsApp2
{
    partial class Form1
    {
        /// <summary>
        ///  Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        ///  Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        ///  Required method for Designer support - do not modify
        ///  the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            components = new System.ComponentModel.Container();
            pictureBox1 = new PictureBox();
            timer1 = new System.Windows.Forms.Timer(components);
            button1 = new Button();
            button2 = new Button();
            button3 = new Button();
            button4 = new Button();
            pictureBox2 = new PictureBox();
            startButton = new Button();
            countdownLabel = new Label();
            ((System.ComponentModel.ISupportInitialize)pictureBox1).BeginInit();
            ((System.ComponentModel.ISupportInitialize)pictureBox2).BeginInit();
            SuspendLayout();
            // 
            // pictureBox1
            // 
            pictureBox1.Location = new Point(57, 33);
            pictureBox1.Name = "pictureBox1";
            pictureBox1.Size = new Size(273, 366);
            pictureBox1.TabIndex = 0;
            pictureBox1.TabStop = false;
            // 
            // button1
            // 
            button1.Location = new Point(60, 405);
            button1.Name = "button1";
            button1.Size = new Size(60, 30);
            button1.TabIndex = 1;
            button1.Text = "버튼1";
            button1.UseVisualStyleBackColor = true;
            // 
            // button2
            // 
            button2.Location = new Point(130, 405);
            button2.Name = "button2";
            button2.Size = new Size(60, 30);
            button2.TabIndex = 2;
            button2.Text = "버튼2";
            button2.UseVisualStyleBackColor = true;
            // 
            // button3
            // 
            button3.Location = new Point(200, 405);
            button3.Name = "button3";
            button3.Size = new Size(60, 30);
            button3.TabIndex = 3;
            button3.Text = "버튼3";
            button3.UseVisualStyleBackColor = true;
            // 
            // button4
            // 
            button4.Location = new Point(270, 405);
            button4.Name = "button4";
            button4.Size = new Size(60, 30);
            button4.TabIndex = 4;
            button4.Text = "버튼4";
            button4.UseVisualStyleBackColor = true;
            // 
            // pictureBox2
            // 
            pictureBox2.Location = new Point(445, 33);
            pictureBox2.Name = "pictureBox2";
            pictureBox2.Size = new Size(273, 366);
            pictureBox2.TabIndex = 5;
            pictureBox2.TabStop = false;
            // 
            // startButton
            // 
            startButton.Location = new Point(445, 405);
            startButton.Name = "startButton";
            startButton.Size = new Size(100, 30);
            startButton.TabIndex = 6;
            startButton.Text = "사진 찍기";
            startButton.UseVisualStyleBackColor = true;
            // 
            // countdownLabel
            // 
            countdownLabel.AutoSize = false;
            countdownLabel.Font = new Font("맑은 고딕", 48F, FontStyle.Bold);
            countdownLabel.Location = new Point(445, 150);
            countdownLabel.Name = "countdownLabel";
            countdownLabel.Size = new Size(273, 100);
            countdownLabel.TabIndex = 7;
            countdownLabel.TextAlign = ContentAlignment.MiddleCenter;
            countdownLabel.Visible = false;
            countdownLabel.BackColor = Color.FromArgb(0, 0, 0, 128);
            countdownLabel.ForeColor = Color.White;
            // 
            // Form1
            // 
            AutoScaleDimensions = new SizeF(7F, 15F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(800, 500);
            Controls.Add(countdownLabel);
            Controls.Add(startButton);
            Controls.Add(pictureBox2);
            Controls.Add(button4);
            Controls.Add(button3);
            Controls.Add(button2);
            Controls.Add(button1);
            Controls.Add(pictureBox1);
            Name = "Form1";
            Text = "Form1";
            ((System.ComponentModel.ISupportInitialize)pictureBox1).EndInit();
            ((System.ComponentModel.ISupportInitialize)pictureBox2).EndInit();
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion

        private PictureBox pictureBox1;
        private System.Windows.Forms.Timer timer1;
        private Button button1;
        private Button button2;
        private Button button3;
        private Button button4;
        private PictureBox pictureBox2;
        private Button startButton;
        private Label countdownLabel;
    }
}

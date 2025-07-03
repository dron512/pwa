namespace Winform
{
    partial class Form1
    {
        /// <summary>
        /// 필수 디자이너 변수입니다.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// 사용 중인 모든 리소스를 정리합니다.
        /// </summary>
        /// <param name="disposing">관리되는 리소스를 삭제해야 하면 true이고, 그렇지 않으면 false입니다.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form 디자이너에서 생성한 코드

        /// <summary>
        /// 디자이너 지원에 필요한 메서드입니다. 
        /// 이 메서드의 내용을 코드 편집기로 수정하지 마세요.
        /// </summary>
        private void InitializeComponent()
        {
            this.button1 = new System.Windows.Forms.Button();
            this.tb1 = new System.Windows.Forms.TextBox();
            this.button2 = new System.Windows.Forms.Button();
            this.lb_upper = new System.Windows.Forms.Label();
            this.lb_lower = new System.Windows.Forms.Label();
            this.tb_number = new System.Windows.Forms.TextBox();
            this.button3 = new System.Windows.Forms.Button();
            this.button4 = new System.Windows.Forms.Button();
            this.tb_score = new System.Windows.Forms.TextBox();
            this.SuspendLayout();
            // 
            // button1
            // 
            this.button1.Font = new System.Drawing.Font("휴먼옛체", 27.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.button1.Location = new System.Drawing.Point(557, 21);
            this.button1.Margin = new System.Windows.Forms.Padding(9, 10, 9, 10);
            this.button1.Name = "button1";
            this.button1.Size = new System.Drawing.Size(244, 66);
            this.button1.TabIndex = 0;
            this.button1.Text = "button1";
            this.button1.UseVisualStyleBackColor = true;
            this.button1.Click += new System.EventHandler(this.button1_Click);
            // 
            // tb1
            // 
            this.tb1.Font = new System.Drawing.Font("휴먼옛체", 27.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.tb1.Location = new System.Drawing.Point(69, 82);
            this.tb1.Margin = new System.Windows.Forms.Padding(9, 10, 9, 10);
            this.tb1.Name = "tb1";
            this.tb1.Size = new System.Drawing.Size(447, 50);
            this.tb1.TabIndex = 1;
            // 
            // button2
            // 
            this.button2.Font = new System.Drawing.Font("휴먼옛체", 27.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.button2.Location = new System.Drawing.Point(557, 107);
            this.button2.Margin = new System.Windows.Forms.Padding(9, 10, 9, 10);
            this.button2.Name = "button2";
            this.button2.Size = new System.Drawing.Size(236, 75);
            this.button2.TabIndex = 2;
            this.button2.Text = "button2";
            this.button2.UseVisualStyleBackColor = true;
            this.button2.Click += new System.EventHandler(this.button2_Click);
            // 
            // lb_upper
            // 
            this.lb_upper.AutoSize = true;
            this.lb_upper.Font = new System.Drawing.Font("휴먼옛체", 27.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lb_upper.Location = new System.Drawing.Point(118, 168);
            this.lb_upper.Margin = new System.Windows.Forms.Padding(9, 0, 9, 0);
            this.lb_upper.Name = "lb_upper";
            this.lb_upper.Size = new System.Drawing.Size(131, 39);
            this.lb_upper.TabIndex = 3;
            this.lb_upper.Text = "대문자";
            // 
            // lb_lower
            // 
            this.lb_lower.AutoSize = true;
            this.lb_lower.Font = new System.Drawing.Font("휴먼옛체", 27.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lb_lower.Location = new System.Drawing.Point(118, 238);
            this.lb_lower.Margin = new System.Windows.Forms.Padding(9, 0, 9, 0);
            this.lb_lower.Name = "lb_lower";
            this.lb_lower.Size = new System.Drawing.Size(131, 39);
            this.lb_lower.TabIndex = 4;
            this.lb_lower.Text = "소문자";
            // 
            // tb_number
            // 
            this.tb_number.Location = new System.Drawing.Point(111, 313);
            this.tb_number.Name = "tb_number";
            this.tb_number.Size = new System.Drawing.Size(180, 50);
            this.tb_number.TabIndex = 5;
            // 
            // button3
            // 
            this.button3.Location = new System.Drawing.Point(338, 313);
            this.button3.Name = "button3";
            this.button3.Size = new System.Drawing.Size(178, 50);
            this.button3.TabIndex = 6;
            this.button3.Text = "button3";
            this.button3.UseVisualStyleBackColor = true;
            this.button3.Click += new System.EventHandler(this.button3_Click);
            // 
            // button4
            // 
            this.button4.Location = new System.Drawing.Point(338, 411);
            this.button4.Name = "button4";
            this.button4.Size = new System.Drawing.Size(178, 50);
            this.button4.TabIndex = 8;
            this.button4.Text = "button4";
            this.button4.UseVisualStyleBackColor = true;
            this.button4.Click += new System.EventHandler(this.button4_Click);
            // 
            // tb_score
            // 
            this.tb_score.Location = new System.Drawing.Point(111, 411);
            this.tb_score.Name = "tb_score";
            this.tb_score.Size = new System.Drawing.Size(180, 50);
            this.tb_score.TabIndex = 7;
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(22F, 39F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(1011, 620);
            this.Controls.Add(this.button4);
            this.Controls.Add(this.tb_score);
            this.Controls.Add(this.button3);
            this.Controls.Add(this.tb_number);
            this.Controls.Add(this.lb_lower);
            this.Controls.Add(this.lb_upper);
            this.Controls.Add(this.button2);
            this.Controls.Add(this.tb1);
            this.Controls.Add(this.button1);
            this.Font = new System.Drawing.Font("휴먼옛체", 27.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.Margin = new System.Windows.Forms.Padding(9, 10, 9, 10);
            this.Name = "Form1";
            this.Text = "Form1";
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Button button1;
        private System.Windows.Forms.TextBox tb1;
        private System.Windows.Forms.Button button2;
        private System.Windows.Forms.Label lb_upper;
        private System.Windows.Forms.Label lb_lower;
        private System.Windows.Forms.TextBox tb_number;
        private System.Windows.Forms.Button button3;
        private System.Windows.Forms.Button button4;
        private System.Windows.Forms.TextBox tb_score;
    }
}


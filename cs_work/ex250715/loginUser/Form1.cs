using MaterialSkin;
using MaterialSkin.Controls;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace loginUser
{
    public partial class Form1 : MaterialForm
    {
        public Form1()
        {
            InitializeComponent();

            var materialSkinManager = MaterialSkinManager.Instance;
            materialSkinManager.AddFormToManage(this);
            materialSkinManager.Theme = MaterialSkinManager.Themes.LIGHT;
            materialSkinManager.ColorScheme = new ColorScheme(Primary.BlueGrey800, Primary.BlueGrey900, Primary.BlueGrey500, Accent.LightBlue200, TextShade.WHITE);

            //this.Text = "여기에서도 바꿀수 있음";

            label1.Font = new Font("맑은 고딕", 30, FontStyle.Bold);
            label2.Font = new Font("맑은 고딕", 30, FontStyle.Bold);
            label3.Font = new Font("맑은 고딕", 30, FontStyle.Bold);

            button1.Font = new Font("맑은 고딕", 16, FontStyle.Bold);
            button2.Font = new Font("맑은 고딕", 16, FontStyle.Bold);
            button3.Font = new Font("맑은 고딕", 16, FontStyle.Bold);

            //this.textBox1.Location = new System.Drawing.Point(50, 50);
            //this.textBox1.Name = "textBox1";
            //this.textBox1.Size = new System.Drawing.Size(100, 21);
            //this.textBox1.TabIndex = 5;

        }

        private void button1_Click(object sender, EventArgs e)
        {
            registerPanel.BringToFront();
            loginPanel.SendToBack();
            myPagePanel.SendToBack();
        }

        private void button2_Click(object sender, EventArgs e)
        {
            registerPanel.SendToBack();
            loginPanel.BringToFront();
            myPagePanel.SendToBack();
        }

        private void button3_Click(object sender, EventArgs e)
        {
            registerPanel.SendToBack();
            loginPanel.SendToBack();
            myPagePanel.BringToFront();
        }

        private void button4_Click(object sender, EventArgs e)
        {
        }

        private async void button5_Click(object sender, EventArgs e)
        {
            //MessageBox.Show($"textbox1.Text {textBox1.Text}");
            //MessageBox.Show($"textbox2.Text {textBox2.Text}");
            //MessageBox.Show($"textbox3.Text {textBox3.Text}");

            var email = textBox1.Text;
            var password = textBox2.Text;
            var nickname = textBox3.Text;

            HttpClient client = new HttpClient();

            var content = new StringContent($"{{\"email\":\"{email}\", \"password\":\"{password}\", \"nickname\":\"{nickname}\"}}", Encoding.UTF8, "application/json");

            var response  = await client.PostAsync("http://localhost:3030/auth/register", content);

            MessageBox.Show(response.ToString());

            MessageBox.Show("회원가입하였습니다.");


        }
    }
}

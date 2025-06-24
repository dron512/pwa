using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace win02
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {

        }

        private void button1_Click(object sender, EventArgs e)
        {
            MessageBox.Show(textBox1.Text,"첫번쨰수잦");
            MessageBox.Show(textBox2.Text);

            // 두 수를 더해서 메시지 박스로 출력
            // int.Parse() : 문자열을 정수로 변환합니다. 변환할 수 없는 경우 예외가 발생합니다.

            // parseInt() number() => 자바스크립트

            int num1 = int.Parse(textBox1.Text);
            int num2 = int.Parse(textBox2.Text);

            // int num1 = Convert.ToInt32(textBox1.Text);
            // int num2 = Convert.ToInt32(textBox2.Text);
            // int num1 = int.TryParse(textBox1.Text, out num1) ? num1 : 0;
            // int num2 = int.TryParse(textBox2.Text, out num2) ? num2 : 0;

            // const aa = 10;
            // console.log(`aa = ${aa}`)

            int a = 10;
            Console.WriteLine($"\"a = {a}\"\tasdf\nqwer"); // C# 6.0 이상에서 지원되는 문자열 보간법

            //MessageBox.Show( (num1 + num2).ToString(),"더한값" );
            MessageBox.Show($"\"{num1 + num2}\"", "더한값");

            //MessageBox.Show(int.Parse(textBox1.Text)+int.Parse(textBox2.Text),"더한값");
        }
    }
}

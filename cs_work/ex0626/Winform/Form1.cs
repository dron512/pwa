using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Winform
{
    public partial class Form1 : Form
    {
        int num = 10;
        public Form1() // 생성자
        {
            InitializeComponent();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            // 1증가 하는거 두개 동치이다.
            num = num + 1;// 이렇게 해도 되고
            //num++; // 이렇게 해도 된다.

            Console.WriteLine(num);
            Console.WriteLine($"textbox1.Text = {textBox1.Text}");

            // textBox1.Text가 비어있지 않으면 10 123 => 124
            // textBox1.Text가 비어있으면 mum 10 => 11
            if (textBox1.Text != "")
            {
                // 22 = 21+1
                // 211 = 21+1

                label2.Text = (int.Parse(textBox1.Text) + 1).ToString(); // textBox1의 값을 비운다.
            }
            else
            {
                label2.Text = num.ToString(); // label2에 num 값을 출력
            }
                
        }

        private void label2_Click(object sender, EventArgs e)
        {
            Console.WriteLine("출력");
        }
    }
}

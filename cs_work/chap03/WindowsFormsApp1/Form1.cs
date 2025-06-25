using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace WindowsFormsApp1
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            int number = 10;
            MessageBox.Show($"number = {number}");
            MessageBox.Show($"number = {number++}");
            MessageBox.Show($"number = {number--}");
            MessageBox.Show($"number = {number}");
        }

        private void button2_Click(object sender, EventArgs e)
        {
            string input = Console.ReadLine();
            MessageBox.Show($"input = {input}");

            // MessageBox.Show("Hello, World!");
            // 함수는 매개변수로 스트링을 받기 때문에
            // string 타입으로 변환해야 합니다.

            // typeof() number() string() 빌튼인 함수
            // messageBox.Show("Hello, World!".ToString());
            MessageBox.Show((!true).ToString());
        }

        private void button3_Click(object sender, EventArgs e)
        {
            doA();
            doA(100);//ㅋㅋㅋㅋㅋㅋ
            doA(100, 200);
            doA("Hello");
            //doA(true);
        }

        // 함수명이 동일할때는 다르게 만들려고 하면
        // 매개변수의 개수나 타입이 달라야 합니다.
        // 함수 오버로딩(Overloading) 이라고 합니다
        public void doA()
        {
            MessageBox.Show("doA() 함수");
        }
        public void doA(int aa)
        {
            MessageBox.Show($"doA() 함수 aa= {aa}");
        }
        public void doA(int aa,int bb)
        {
            MessageBox.Show($"doA() 함수 aa= {aa} bb={bb}");
        }
        public void doA(string cc)
        {
            MessageBox.Show($"doA() 함수 cc= {cc}");
        }
    }
}

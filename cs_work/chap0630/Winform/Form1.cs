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
        public Form1()
        {
            InitializeComponent();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            string messase = "Hello, World!";
            int number = messase.Length;
            MessageBox.Show($"number = {number}");

            int a = 10;
            //MessageBox.Show(a.Length);// Length는 오직 string에만 사용 가능한 속성입니다.
        }

        private void button2_Click(object sender, EventArgs e)
        {
            MessageBox.Show(tb1.Text); // 화면에서 값 가져오기
            tb1.Text = "Hello, World!"; // 화면에 값 설정하기

            lb_lower.Text = tb1.Text.ToLower(); // 소문자로 변환하여 레이블에 표시
            lb_upper.Text = tb1.Text.ToUpper(); // 대문자로 변환하여 레이블에 표시

            // world -> cat
            string result = tb1.Text.Replace("World", "cat");

            MessageBox.Show(result); // "Hello, cat!"로 변경된 문자열을 표시
        }

        private void button3_Click(object sender, EventArgs e)
        {
            // 예외 처리 하기
            try
            {
                //              조건? true : false
                string result = int.Parse(tb_number.Text) % 2 == 0 ? "짝수" : "홀수";
                MessageBox.Show($"'result' = {result}");
            }
            catch (Exception ex)
            {
                MessageBox.Show($"숫자를 입력하세요");
            }
        }

        private void button4_Click(object sender, EventArgs e)
        {
            try
            {
                int score = int.Parse(tb_score.Text);
                MessageBox.Show($"score = {score}");

                if( score < 100 || score >= 90)
                {
                    MessageBox.Show("점수는 A 학점입니다.");
                    return;
                }
                else if( score < 90 && score >= 80)
                {
                    MessageBox.Show("점수는 B 학점입니다.");
                    return;
                }
                else if (score < 80 && score >= 70)
                {
                    MessageBox.Show("점수는 C 학점입니다.");
                    return;
                }
                else if (score < 70 && score >= 60)
                {
                    MessageBox.Show("점수는 D 학점입니다.");
                    return;
                }
                else
                {
                    MessageBox.Show("점수는 F 학점입니다.");
                    return;
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"숫자를 입력하세요");
            }
            finally
            {
                // 예외가 발생하든 안 하든 항상 실행되는 코드
                MessageBox.Show("점수 계산이 완료되었습니다.");
            }
        }
    }
}

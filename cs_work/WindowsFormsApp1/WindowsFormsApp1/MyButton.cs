using MaterialSkin.Controls;
using System.Drawing;

namespace WindowsFormsApp1
{

    public class MyButton : MaterialButton
    {
        public MyButton()
        {
            // 폰트 강제 설정
            this.Font = new Font("맑은 고딕", 32, FontStyle.Bold);
        }
    }

}

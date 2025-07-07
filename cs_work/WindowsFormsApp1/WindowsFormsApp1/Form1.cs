using MaterialSkin;
using MaterialSkin.Controls;
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
    public partial class Form1 : MaterialForm
    {
        public Form1()
        {
            InitializeComponent();
            // Material 디자인 매니저 초기화
            var materialSkinManager = MaterialSkinManager.Instance;
            materialSkinManager.AddFormToManage(this);

            // 테마 설정 (라이트/다크)
            materialSkinManager.Theme = MaterialSkinManager.Themes.LIGHT;

            // 컬러 스킴 설정
            materialSkinManager.ColorScheme = new ColorScheme(
                Primary.Blue600, Primary.Blue700,
                Primary.Blue200, Accent.Orange700,
                TextShade.WHITE
            );

            // 컨트롤 추가
            var materialButton = new MyButton
            {
                Text = "글자 큼!",
                Location = new System.Drawing.Point(100, 150),
                AutoSize = false,
                Size = new Size(150, 50)
            };
            materialButton.Click += (s, e) =>
            {
                MessageBox.Show("MaterialSkin 버튼 클릭!");
            };

            Controls.Add(materialButton);
        }
    }
}

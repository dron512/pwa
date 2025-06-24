using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp1
{
    internal class Program
    {
        static void Main(string[] args)
        {
            // 여기가 프로그램 시작점입니다.
            // 콘솔 앱, winfrom 앱
            Console.WriteLine("안녕하세요");

            int a = 10;
            a = a + 20;
            // 숫자만 넣을수 있기 때문에 "aaa" 넣을수 없다.

            // ctrl + a 모두 선택
            // ctrl + k + d 코드 정리 ctrl + k + c 주석
            // ctrl + k + u 주석 해제
            // ctrl + f5 실행
            // ctrl + f5 디버그 없이 실행

            string c = a + "a";
            Console.WriteLine("a = " + a);
            Console.WriteLine("c = " + c);
            Console.WriteLine(57 < 263);
            Console.WriteLine(57 > 263);

            bool isTrue = true;
            bool isFalse = 30<20;
            Console.WriteLine(isTrue);
            Console.WriteLine(isFalse);
        }
    }
}

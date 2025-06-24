using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace chap02
{
    internal class Program
    {
        // 프로그램 시작시 항상 존재하는 함수나 변수 static
        // window, global , self 

        // function a(); -> return 아무렇게나 만들 수 있다.
        // C# java -> 반환값을 개발자 적어줘야합니다

        // public staic void main(String[] args) { }

        static void Main(string[] args)
        {
            Console.WriteLine("안녕");
            /*
             * int 숫자
             * string 문자열
             * bool 참/거짓
             */
            //int a = "안녕"; // 오류 발생, int는 숫자만 저장할 수 있습니다.

            Console.WriteLine(32.GetType());
            Console.WriteLine(129L.GetType());

            Console.WriteLine(3.14f.GetType());
            Console.WriteLine(3.14.GetType());

            Console.WriteLine(true.GetType());
            Console.WriteLine("안녕".GetType());
            Console.WriteLine('A'.GetType());
            Console.WriteLine("안녕".Length); // 문자열의 길이
            Console.WriteLine("asdf".ToUpper()); // 문자열을 대문자로 변환
            Console.WriteLine("asdf".ToLower()); // 문자열을 소문자로 변환
            Console.WriteLine("안녕".Substring(1)); // 문자열의 일부를 추출

            int a = 10;
            double b = 3.14;

            string c = "안녕하세요";
            bool d = true;
            char e = 'A';

            var f = 100; // var는 타입을 자동으로 추론합니다.
            Console.WriteLine(f.GetType());

        }
    }
}

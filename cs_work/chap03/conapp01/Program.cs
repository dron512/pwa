using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

// cs-> 0,1
// 컴파일러
// 컴파일은 ->  컴퓨터가 이해할 수 있는 언어로 변환하는 것
// 컴퓨터는 0,1만 압니다.

// 0,1-> 사람이 알수 있는 언어로 cs 변경하는
// 디컴파일러
// 디컴파일은 -> 컴퓨터가 이해할 수 있는 언어로 변환된 것을
// 사람이 이해할 수 있는 언어로 변환하는 것

namespace conapp01
{
    internal class Program
    {
        static void Main(string[] args)
        {
            // 32bit 에서는 큰 숫자를 표현할 수 없다.
            // int는 6,553,535까지 표현 가능

            // long은 9,223,372,036,854,775,807까지 표현 가능
            // 프로그래밍 언어 언어..

            // L 는 long 타입을 의미한다.

            long b = 12812837912837L;
            int a = (int)b;

            // int 32bit -> 4byte
            // long 64bit

            Console.WriteLine(a);
            Console.WriteLine(b);

            // 암묵적 형변환(Implicit Casting)
            int c = 12127389;
            long d = c;

            // 명시적 형변환(Explicit Casting)
            long e = 121273833339L;
            int f = (int)e;

            AA aa = new AA();
            BB bb = new BB();

            aa.Test();
            bb.Test();

            AA ab = new BB(); // 업캐스팅
            ab.Test();
        }
    }

    class AA
    {
        public virtual void Test()
        {
            Console.WriteLine("AA 클래스의 Test 메서드");
        }
    }
    class BB : AA
    {
        public override void Test()
        {
            Console.WriteLine("BB 클래스의 Test 메서드");
        }
    }
}

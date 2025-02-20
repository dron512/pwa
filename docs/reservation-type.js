const $select = document.querySelector('#type');
const $etc1 = document.querySelector('#etc1');
const $etc2 = document.querySelector('#etc2');
const $divService = document.querySelector('#div-service');

const $nameInput = document.querySelector('#name');
const $phoneInput = document.querySelector('#phone');

const $typeInput = document.querySelector('#type');

const $jimStartHour = document.querySelector('#jum-start-hour');
const $jimStartMin = document.querySelector('#jim-start-min');
const $jimEndHour = document.querySelector('#jim-end-hour');
const $jimEndMin = document.querySelector('#jim-end-min');

const $keepBag1 = document.querySelector('#keep-bag1');
const $keepBag2 = document.querySelector('#keep-bag2');
const $keepBag3 = document.querySelector('#keep-bag3');

const $useDateInput =document.querySelector('#use-date');
const $commentInput = document.querySelector('#comment');
const $agreeInput = document.querySelector('#agree');

const $nameOutput = document.querySelector('#r-name');
const $phoneOutput = document.querySelector('#r-phone');
const $dateOutput = document.querySelector('#r-date');
const $commentOutput = document.querySelector('#r-comment');

const $confirmReserve = document.querySelector('#confirm-reserve');
const $cancelReserve = document.querySelector('#cancel-reserve');
const $submitReserve = document.querySelector('#submit-reserve');

const $step01 = document.querySelector('#step01');
const $step02 = document.querySelector('#step02');

const dbConnect = supabase.createClient('https://fsvilhpktvuyimkzgflu.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzdmlsaHBrdHZ1eWlta3pnZmx1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk0MjUwODgsImV4cCI6MjA1NTAwMTA4OH0.LU7A0fgqUj2eia-xunOWZYDuvfSvuM-a1_4V3TffXrI');

$select.addEventListener('change', function (e) {
    if(e.target.value === 'jim-keep'){
        $etc1.classList.remove('hidden');
        $etc2.classList.add('hidden');

        $divService.classList.remove('h-20');
        $divService.classList.add('h-100');
    }
    else if(e.target.value === 'jim-move'){
        $etc1.classList.add('hidden');
        $etc2.classList.remove('hidden');

        $divService.classList.remove('h-20');
        $divService.classList.add('h-100');
    }
    else {
        $etc1.classList.add('hidden');
        $etc2.classList.add('hidden');

        $divService.classList.remove('h-100');
        $divService.classList.add('h-20');
    }
});

$confirmReserve.addEventListener('click', function (e) {
    // false 이면... return
    if( !($agreeInput.checked) ){
        alert('개인정보 취급 방침에 동의하셔야 합니다.')
        return;
    }
    if( $nameInput.value === '' ){
        alert('예약자이름 입력하세요');
        $nameInput.focus();
        return;
    }
    // 예약자 이름 설정
    $nameOutput.innerHTML = $nameInput.value;
    $phoneOutput.innerHTML = $phoneInput.value;
    $dateOutput.innerHTML = $useDateInput.value;
    $commentOutput.innerHTML = $commentInput.value;

    $step01.classList.add('hidden');
    $step02.classList.remove('hidden');
});

$cancelReserve.addEventListener('click', function (e) {
    $step02.classList.add('hidden');
    $step01.classList.remove('hidden');
})

$submitReserve.addEventListener('click', async function (e) {
    await dbConnect.from('reservation').insert([
        {
            id: 1,  // 실제 고객 ID로 변경
            use_date: '2025-02-07', // 예약 날짜 (YYYY-MM-DD)
            departure_time: '10:00:00', // 출발 시간 (HH:MM:SS)
            departure_location: 'Seoul Station', // 출발 장소
            arrival_time: '12:00:00', // 도착 시간 (HH:MM:SS)
            arrival_location: 'Busan Station', // 도착 장소
            shopping_bag_count: 2, // 쇼핑백 개수
            carrier_small_count: 1, // 작은 캐리어 개수
            carrier_large_count: 0, // 큰 캐리어 개수
            other_items: 'Umbrella, Backpack', // 기타 물품
            inquiries: 'Handle with care', // 문의 사항
            status: 'pending', // 예약 상태
            total_price: 50000, // 총 가격
            payment_status: 'pending', // 결제 상태
        }
    ])
})



// 페이지 html,css 랜더링이 끝나자마자 자동 실행..


/*
{
    id: 1,  // 실제 고객 ID로 변경
    use_date: '2025-02-07', // 예약 날짜 (YYYY-MM-DD)
    departure_time: '10:00:00', // 출발 시간 (HH:MM:SS)
    departure_location: 'Seoul Station', // 출발 장소
    arrival_time: '12:00:00', // 도착 시간 (HH:MM:SS)
    arrival_location: 'Busan Station', // 도착 장소
    shopping_bag_count: 2, // 쇼핑백 개수
    carrier_small_count: 1, // 작은 캐리어 개수
    carrier_large_count: 0, // 큰 캐리어 개수
    other_items: 'Umbrella, Backpack', // 기타 물품
    inquiries: 'Handle with care', // 문의 사항
    agree_terms: true, // 약관 동의 여부
    status: 'pending', // 예약 상태
    total_price: 50000, // 총 가격
    payment_status: 'pending', // 결제 상태
}
*/
// console.log(supabase);


// var person = {
//     doPrint(){
//         console.log('test');
//     }
// }
//
// person.doPrint();

























const supabaseUrl = "https://zgrjjnifqoactpuqolao.supabase.co";
const supabaseAnonkey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpncmpqbmlmcW9hY3RwdXFvbGFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyNDc0NTgsImV4cCI6MjA1NjgyMzQ1OH0._Vl-6CRKdMjeDRyNoxlfect7sgusZ7L0N5OYu0a5hT0";

const supabase = window.supabase.createClient(supabaseUrl, supabaseAnonkey);

document.getElementById('review-save-btn').addEventListener('click', async function(){
    const name = document.getElementById('review-name').value;
    const title = document.getElementById('review-title').value;
    const password = document.getElementById('review-password').value;
    const review_txt = document.getElementById('review-txt').value;

    // user uuid
    const res = await supabase.auth.getUser();
    console.log(res.data.user.id);

});

document.getElementById('sign').addEventListener('click', async function () {
    const $email = document.getElementById('email').value;
    const $password = document.getElementById('password').value;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // $email 안에 있는 변수가 email형식이 맞으면 true 아니면 false 로 ...
    const result = emailRegex.test($email);
    if (!result) {
        alert('email형식이 아닙니다.');
        return;
    }

    this.disabled = "true";
    this.innerHTML = "회원가입중...";

    const res = await supabase.auth.signUp({ email: $email, password: $password });
    if (res.error) {
        alert('에러발생', res.error);
    } else {
        alert('회원가입되었습니다. 이메일 인증 후 로그인하세요');
        this.innerHTML = "회원가입";
    }
    this.disabled = "";
});

document.getElementById('login').addEventListener('click', async () => {
    const $email = document.getElementById('email').value;
    const $password = document.getElementById('password').value;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // $email 안에 있는 변수가 email형식이 맞으면 true 아니면 false 로 ...
    const result = emailRegex.test($email);
    if (!result) {
        alert('email형식이 아닙니다.');
        return;
    }

    const res = await supabase.auth.signInWithPassword({ email: $email, password: $password });
    if (res.error) {
        alert('에러발생', res.error);
    } else {
        alert('로그인되었습니다.');
        document.getElementById('email').value = "";
        document.getElementById('password').value = "";

        const res = await supabase.auth.getUser();
        if (res.data.user) {
            const $loginStatus = document.getElementById('login-status');
            $loginStatus.innerHTML = `로그인된 ${JSON.stringify(res.data.user)}`;
        }
    }
});

document.getElementById('logout').addEventListener('click', async () => {
    const res = await supabase.auth.signOut();
    const $loginStatus = document.getElementById('login-status');
    $loginStatus.innerHTML = `로그아웃되었습니다.`;
});

document.getElementById('kakao-login').addEventListener('click', async () => {
    const res = await supabase.auth.signInWithOAuth({
        provider: 'kakao'
    })
    console.log(res);
});

document.addEventListener('DOMContentLoaded', async function () {
    const res = await supabase.auth.getUser();
    if (res.data.user) {
        const $loginStatus = document.getElementById('login-status');
        $loginStatus.innerHTML = `로그인된 ${JSON.stringify(res.data.user)}`;
    }
})
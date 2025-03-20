const supabaseUrl = "https://zgrjjnifqoactpuqolao.supabase.co";
const supabaseAnonkey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpncmpqbmlmcW9hY3RwdXFvbGFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyNDc0NTgsImV4cCI6MjA1NjgyMzQ1OH0._Vl-6CRKdMjeDRyNoxlfect7sgusZ7L0N5OYu0a5hT0";

const supabase = window.supabase.createClient(supabaseUrl, supabaseAnonkey);

async function selectReview() {
    const res = await supabase.from('review').select();
    console.log(res);

    const $reviewList = document.getElementById('review-list');
    // 안에 있는거 없애기...
    $reviewList.innerHTML = '';

    res.data.forEach(review => {
        const reviewDiv = document.createElement('div');
        reviewDiv.innerHTML = `
            <h3>${review.title}</h3>
            <img src="${review.file_url}" alt="${review.file_url}" width="100">
        `
        $reviewList.appendChild(reviewDiv);
    })

}

selectReview();
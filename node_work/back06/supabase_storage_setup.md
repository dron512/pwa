# Supabase Storage 설정 가이드

## 1. Storage 버킷 생성

Supabase 대시보드에서 다음 단계를 따라하세요:

1. Supabase 프로젝트 대시보드 접속
2. 왼쪽 메뉴에서 "Storage" 클릭
3. "New bucket" 버튼 클릭
4. 버킷 이름: `cleaner-images`
5. Public bucket 체크 (이미지를 공개적으로 접근 가능하게 하기 위해)
6. "Create bucket" 클릭

## 2. Storage 정책 설정

버킷이 생성된 후, 다음 RLS 정책을 설정하세요:

### 읽기 정책 (모든 사용자가 이미지를 볼 수 있도록)
```sql
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'cleaner-images');
```

### 쓰기 정책 (인증된 사용자만 업로드 가능)
```sql
CREATE POLICY "Authenticated users can upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'cleaner-images' AND auth.role() = 'authenticated');
```

## 3. 파일 크기 제한 설정

Supabase Storage의 기본 파일 크기 제한은 50MB입니다. 필요에 따라 조정할 수 있습니다.

## 4. CORS 설정 (필요시)

웹 애플리케이션에서 직접 업로드하는 경우 CORS 설정이 필요할 수 있습니다.

---

이 설정이 완료되면 청소완료 시 이미지 업로드가 정상적으로 작동합니다. 
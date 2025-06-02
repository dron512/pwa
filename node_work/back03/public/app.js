if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((reg) => console.log("Service Worker 등록 성공:", reg.scope))
      .catch((err) => console.error("Service Worker 등록 실패:", err));
  });
  navigator.serviceWorker.ready
    .then((registration) => {
      return registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: "BMq3F00aFd-uR2uUHuzf5i57BfVC9KcPJmvSr90CjYn8cgvz8oqXBBqKfuv9O-gaOot6Eqzl-ujlkUaIXgAdqZ4",
      });
    })
    .then((subscription) => {
      // 서버로 subscription 객체 전송
      fetch("/subscribe", {
        method: "POST",
        body: JSON.stringify(subscription),
        headers: { "Content-Type": "application/json" },
      })
      .then(()=>{
        console.log("구독성공")
      });
    });
}

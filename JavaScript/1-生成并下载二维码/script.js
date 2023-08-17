const input = document.querySelector("input");
const img = document.querySelector("img");
const generate = document.querySelector("#generate");
const download = document.querySelector("#download");

generate.addEventListener("click", () => {
  const qrCode = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${input.value}`;
  img.src = qrCode;
});

download.addEventListener("click", async () => {
  const response = await fetch(img.src);
  const blob = await response.blob();
  const downloadLink = document.createElement("a");
  downloadLink.href = URL.createObjectURL(blob);
  downloadLink.download = "qrcode.jpg";
  downloadLink.click();
});

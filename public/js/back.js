const userIdInput = document.getElementById("userId");
const snapBtn = document.getElementById("snap");
const uploadBtn = document.getElementById("upload");
const cancelBtn = document.getElementById("cancel");
const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

let kppId = localStorage.getItem("kppId");

if(Number(kppId) != 2) {
  window.location.href = "/";
};

userIdInput.addEventListener("change", async function () {
  const userId = userIdInput.value;

  if (!userId) {
    snapBtn.disabled = true;
    video.style.display = "none";
    return;
  }

  try {
    const response = await fetch(`http://localhost:4000/api/userId`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: Number(userId) }),
    });

    const data = await response.json();
    localStorage.setItem("empId", data.user);

    if (response.status === 200) {
      snapBtn.disabled = false;
      video.style.display = "block";

      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
      } catch (err) {
        console.error("Kamera ochishda xatolik:", err);
        video.style.display = "none";
      }

    } else {
      snapBtn.disabled = true;
      video.style.display = "none";
    }

  } catch (error) {
    console.error("Xatolik:", error);
    snapBtn.disabled = true;
    video.style.display = "none";
  }
});

snapBtn.addEventListener("click", () => {
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  canvas.style.display = "block";
  uploadBtn.style.display = "inline";
  cancelBtn.style.display = "inline";
  snapBtn.disabled = true;
});

cancelBtn.addEventListener("click", () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  canvas.style.display = "none";
  uploadBtn.style.display = "none";
  cancelBtn.style.display = "none";
  snapBtn.disabled = false;
});

uploadBtn.addEventListener("click", async () => {
  const blob = await new Promise((resolve) =>
    canvas.toBlob(resolve, "image/jpeg")
  );

  const directionInput = document.querySelector('input[name="direction"]:checked');
  const direction = directionInput ? directionInput.value : null;

  if (!direction) {
    alert("Iltimos, 'Kirish' yoki 'Chiqish' ni tanlang.");
    return;
  }

  const formData = new FormData();
  formData.append("file", blob, "file.jpg");
  formData.append("empId", localStorage.getItem("empId"));
  formData.append("kppId", localStorage.getItem("kppId"));
  formData.append("direction", direction);

  try {
    const response = await fetch("http://localhost:4000/api/controls/create", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    alert("Control succsessfuly created !");
    window.location.href = "/back";
  } catch (err) {
    console.log("Error: " + err.message);
  }
});

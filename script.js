let isIgnite = false;
document.addEventListener("DOMContentLoaded", async () => {
  const github = promptCaller("The github profile: ", {
    required: true,
    refresh: true,
  });
  const projectMarkValue = promptCaller("The Project specification: ")
  const TextMarkValue = promptCaller("The text fisolofy: ")
  await generateCard(github, projectMarkValue, TextMarkValue);
});

function promptCaller(message, { required = false, refresh  = false} = {}) {
  const call = prompt(message);
  if (!call && required) {
    alert(`Is necessary than Prompt: ${message}, contains a value.`);
  }
  if (!call && refresh) {
    window.location.reload();
  } else {
    return call;
  }
}

function changeCard(event, clicked) {
  if (clicked.attributes.class.value.includes("on-back")) {
    clicked.style.display = "none";
    document.getElementsByClassName("on-front")[0].style.display =
      "inline-block";
  } else {
    clicked.style.display = "none";
    document.getElementsByClassName("on-back")[0].style.display =
      "inline-block";
  }
}

function createQR(link) {
  const qrCode = new QRCodeStyling({
    width: 150,
    height: 150,
    data: link,
    margin: 0,
    qrOptions: { typeNumber: "0", mode: "Byte", errorCorrectionLevel: "Q" },
    imageOptions: { hideBackgroundDots: true, imageSize: 0.4, margin: 0 },
    dotsOptions: { type: "square", color: "#000000" },
    backgroundOptions: { color: "#ffffff" },
    image:
      "data:image/png;base64,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",
    dotsOptionsHelper: {
      colorType: { single: true, gradient: false },
      gradient: {
        linear: true,
        radial: false,
        color1: "#6a1a4c",
        color2: "#6a1a4c",
        rotation: "0",
      },
    },
    cornersSquareOptions: { type: "", color: "#000000" },
    cornersSquareOptionsHelper: {
      colorType: { single: true, gradient: false },
      gradient: {
        linear: true,
        radial: false,
        color1: "#000000",
        color2: "#000000",
        rotation: "0",
      },
    },
    cornersDotOptions: { type: "", color: "#000000" },
    cornersDotOptionsHelper: {
      colorType: { single: true, gradient: false },
      gradient: {
        linear: true,
        radial: false,
        color1: "#000000",
        color2: "#000000",
        rotation: "0",
      },
    },
    backgroundOptionsHelper: {
      colorType: { single: true, gradient: false },
      gradient: {
        linear: true,
        radial: false,
        color1: "#ffffff",
        color2: "#ffffff",
        rotation: "0",
      },
    },
  });

  qrCode.append(document.getElementById("canvas"));
}

async function generateCard(
  github,
  projectMarkValue = "Developer",
  TextMarkValue = "Não há nada para mostrar aqui"
) {
  const { bio, name, avatar_url, html_url, ...args } = await fetch(
    `https://api.github.com/users/${github}`
  )
    .then((response) => response.json())
    .then((response) => {
      return response;
    });
  nameID.innerHTML = name;
  bioID.innerHTML = bio.replace(/(:\w+:)/gim, "");
  avatarID.attributes.src.value = avatar_url;
  projectMark.innerHTML = projectMarkValue ?? "Developer";
  TextMark.innerHTML =
  TextMarkValue ? TextMarkValue.length < 200
      ? `"${TextMarkValue}"`
      : `"${TextMarkValue.slice(0, 200)} ..."` : "Não há nada para mostrar aqui";
  createQR(html_url);
  document.getElementsByClassName("on-front")[0].style.display = "inline-block";
}
function alterColor(deg) {
  const elements = document.getElementsByClassName("img-background");
  for (let element of elements) {
    element.style.filter = `hue-rotate(${deg}deg)`;
  }
}

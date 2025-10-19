function addToInvoice() {
  const courseSelect = document.getElementById("c_id");
  const course = courseSelect.options[courseSelect.selectedIndex].text;

  const paymentInput = document.getElementById("p_id");
  const payment = paymentInput.value.trim();

  const studentIdInput = document.getElementById("s_id");
  const studentId = studentIdInput.value.trim();

  const batchInput = document.getElementById("b_id");
  const batch = batchInput.value.trim();

  const nameInput = document.getElementById("n_id");
  const name = nameInput.value.trim();

  const addressInput = document.getElementById("a_id");
  const address = addressInput.value.trim();

  const mobileInput = document.getElementById("m_id");
  const mobile = mobileInput.value.trim();

  const emailInput = document.getElementById("e_id");
  const email = emailInput.value.trim();

  if (course == "Select Course") {
    courseSelect.classList.add("border-red-500");
    courseSelect.focus();
  } else if (payment == "") {
    paymentInput.value = "";
    paymentInput.placeholder = "*Please enter Payment Amount.";
  } else if (studentId == "") {
    studentIdInput.value = "";
    studentIdInput.placeholder = "*Please enter Student ID.";
  } else if (batch == "") {
    batchInput.value = "";
    batchInput.placeholder = "*Please enter Batch.";
  } else if (name == "") {
    nameInput.value = "";
    nameInput.placeholder = "*Please enter Student Name.";
  } else if (address == "") {
    addressInput.value = "";
    addressInput.placeholder = "*Please enter Address.";
  } else if (mobile == "") {
    mobileInput.value = "";
    mobileInput.placeholder = "*Please enter Mobile.";
  } else if (email == "") {
    emailInput.value = "";
    emailInput.placeholder = "*Please enter Email.";
  } else {
    document.getElementById("invScreen").style.display = "block";
    document.getElementById("btns").style.display = "flex";
    document.getElementById("inputScreen").style.display = "none";

    document.getElementById("course").innerHTML = course;
    document.getElementById("payment").innerHTML = payment;
    document.getElementById("sid").innerHTML = studentId;
    document.getElementById("batch").innerHTML = batch;
    document.getElementById("sname").innerHTML = name;
    document.getElementById("address").innerHTML = address;
    document.getElementById("mobile").innerHTML = mobile;
    document.getElementById("email").innerHTML = email;
    document.getElementById("email").setAttribute("href", "mailto:" + email);

    const today = new Date().toISOString().split("T")[0];
    document.getElementById("date").innerHTML = today;
  }
}

function back() {
  document.getElementById("invScreen").style.display = "none";
  document.getElementById("btns").style.display = "none";
  document.getElementById("inputScreen").style.display = "grid";
}

// function printInvoice() {
//     const originalContent = document.body.innerHTML;
//     const invoiceContent = document.getElementById("invScreen").innerHTML;

//     document.body.innerHTML = invoiceContent;
//     window.print();
//     document.body.innerHTML = originalContent;
//     window.location.reload();
// }

function downloadInvoice() {
  const invoiceElement = document.getElementById("invScreen");
  const opt = {
    margin: 0.5,
    filename: "SCC_Invoice.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { format: "letter", orientation: "portrait" },
  };
  html2pdf().from(invoiceElement).set(opt).save();
}

function shareInvoice() {
  const invoiceElement = document.getElementById("invScreen");
  const opt = {
    margin: 0.5,
    filename: "SCC_Invoice.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };

  html2pdf()
    .set(opt)
    .from(invoiceElement)
    .toPdf()
    .get("pdf")
    .then(function (pdf) {
      const blob = new Blob([pdf.output("blob")], { type: "application/pdf" });
      const file = new File([blob], "SCC_Invoice.pdf", {
        type: "application/pdf",
      });

      if (navigator.share) {
        navigator
          .share({
            title: "SCC Invoice",
            text: "Here is your invoice from SCC.",
            files: [file],
            url: window.location.href,
          })
          .then(() => console.log("Share successful"))
          .catch((error) => console.log("Share failed:", error));
      } else {
        // Fallback for browsers without Web Share API
        downloadInvoice();
      }
    })
    .catch((error) => {
      console.error("Error generating PDF:", error);
      downloadInvoice(); // Fallback to download if PDF generation fails
    });
}

function reloadPage() {
  window.location.reload();
}

function a() {
  alert("success");
}

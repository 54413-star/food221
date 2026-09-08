// โหลด EmailJS SDK
(function() {
    emailjs.init("YOUR_PUBLIC_KEY"); // ใส่ Public Key ของคุณ
})();

// ฟังก์ชั่นส่งอีเมลแจ้งเตือน
function sendExpiryEmail(userEmail, foodName) {
    var templateParams = {
        to_email: userEmail,
        food_name: foodName,
        message: 'อาหารของคุณกำลังจะหมดอายุในวันนี้!'
    };

    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
        .then(function(response) {
           console.log('ส่งอีเมลสำเร็จ!', response.status, response.text);
        }, function(error) {
           console.log('ส่งอีเมลล้มเหลว...', error);
        });
}

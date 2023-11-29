const Qrcode = (props) => {
    const qrcodeUrl = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Example" + props.email;
    return ( 
        <div>
            <h1>Screenshot or print your Qrcode</h1>
            <img src={qrcodeUrl} alt="your QRcode"/>
        </div>
    );
}
 
export default Qrcode;
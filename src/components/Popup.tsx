

function Popup({ infoPopup, setOpenPopup }: PropsPopup) {
  const handleClose = () => {
    setOpenPopup(false);
  };
  return (
    <div
      style={{
        position: "absolute",
        backgroundColor: "#7ab899",
        borderRadius: "8px",
        boxShadow: "0px 0px 10px #000000cc",
        left: "25%",
        top: "25%",
        padding: "80px",
        // width: "50%",
        // height: "50%",
      }}
    >
      <p onClick={handleClose}>CERRAR</p>
      <p>{infoPopup.title}</p>
      <p>{infoPopup.info}</p>
    </div>
  );
}

export default Popup;

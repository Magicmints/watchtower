import { bill } from "../assets"
import styles, { layout } from "../style"

const Zk = () => {
  return (
    <section id="Working" className={layout.sectionReverse}>
      <div className={layout.sectionImgReverse}>
        <img src={bill} alt="billing" className="w-[100%] h-[100%] relative z-[5]" />

        {/* gradient start */}
        <div className="absolute z-[3] -left-1/2 top-0 w-[50%] h-[50%] rounded-full white__gradient" />
        <div className="absolute z-[0] w-[70%] h-[70%] -left-1/2 bottom-0 rounded-full blue__gradient" />
        {/* gradient end */}
      </div>
      <div className={layout.sectionInfo}>
        <h2 className={styles.heading2}>
          Email Notifications  <br className="sm:block hidden" /> of Your Wallet's Risk Score

        </h2>

        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
          Stay informed about the security of your digital assets by receiving email notifications of your wallet's risk score. Our system provides real-time updates to help you make informed decisions.
        </p>
        /</div>
    </section>



  )
}

export default Zk
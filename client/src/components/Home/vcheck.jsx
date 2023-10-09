import { card } from "../../assets";
import styles, { layout } from "../../style";
import Button from "./Button";
const Vcheck = () => {
  return (
    <section id="Vcheck" className={layout.section} >
      <div className={layout.sectionInfo}>
        <h2 className={styles.heading2}>
          Coming Soon! <br className="sm:block hidden" /> The Watch Tower Verified Check 🌟
        </h2>
        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>

          Verified Check for NFTs with well-defined metadata, exchange listings, and social handles. A new standard in Solana NFT trust is on the horizon.
        </p>

        <Button styles={`mt-10`} />
      </div>


      <div className={layout.sectionImg}>
        <img src={card} alt="billing" className="w-[100%] h-[100%]" />

        {/* gradient start */}
        <div className="absolute z-[3] -left-1/2 top-0 w-[50%] h-[50%] rounded-full white__gradient" />
        <div className="absolute z-[0] w-[70%] h-[70%] -left-1/2 bottom-0 rounded-full blue__gradient" />
        {/* gradient end */}
      </div>
    </section>
  )
}

export default Vcheck
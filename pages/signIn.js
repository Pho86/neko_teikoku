import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function SignIn() {
  return (
    <div className={styles.background}>
      <Head>
        <title>Create Next App</title>
        <link />
      </Head>
      <div className={styles.outermain}>
      <div className={styles.btn}>
          <button className={styles.loginbtn}>login</button>
          <button className={styles.signinbtn}>signup</button>
        </div>
        <div className={styles.vectorX}>
          <Image 
            src="/vectorX.png"
            alt="X"
            width={35}
            height={35}
            className={styles.imgX}
          />
        </div>
        
        
      <main className={styles.signInBox}>
      <div className={styles.logoImages}>
        <Image
            src="/nekoteikoku.png"
            alt="logo"
            width={300}
            height={300}
            quality={80}
            className={styles.logo}
          />

          <Image
            src="/chiling.png"
            alt="User profile photo"
            width={300}
            height={300}
            quality={80}
            className={styles.logoCat}
          />
          
        </div>
        <div className={styles.vl}></div>

        <div className={styles.split}>
          <div>
            <div className={styles.texts}>
              <h2 className={styles.meowcome}>Meowcome Back!</h2>
              <p className={styles.meow}>MeowMeowMeowMeow</p>
            </div>
            <div className={styles.inputBox}>
              <input
                type="text"
                placeholder="Email"
                className={styles.input}
              ></input>
              <input
                type="text"
                placeholder="Password"
                className={styles.input}
              ></input>
            </div>
            <button className={styles.button}>LOGIN</button>
            <p className={styles.redtext}>Need an account? Register</p>
          </div>
        </div>
      </main>
      </div>
    </div>
  );
}

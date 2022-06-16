import { GetStaticProps } from 'next'
import Head from "next/head";

import { SubscribeButton } from "../components/SubscribeButton";
import { stripe } from "../services/stripe";

import styles from  './home.module.scss';


interface HomeProps {
  product: {
    priceId: string,
    amount: number,
  }
}

export default function Home({product}: HomeProps) {
 
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>
      <h1>
        <main className={styles.contentContainer}>
          <section className={styles.hero}>
            <span>👏 Hey, welcome</span>
            <h1> News about the <span>React</span> world.</h1>
            <p>
              Get access to all publications <br />
              <span>for {product.amount} month</span>
            </p>
            <SubscribeButton priceId={product.priceId} />
          </section>

          <img src="/images/avatar.svg" alt="Girl coding"/>
        </main>
      </h1>
    </>
  );
}

export  const getServerSideProps: GetStaticProps = async() => {
  const price = await stripe.prices.retrieve('price_1LAk77FyTPtkHmyDL9rSf87O')

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
    }).format(price.unit_amount / 100)
  }

  return{
    props: {
      product,
    },
    revalidate: 60 * 60 * 24 // 24 hours
  }
}
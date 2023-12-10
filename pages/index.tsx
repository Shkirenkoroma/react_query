import { Inter } from 'next/font/google'
import { useQuery } from 'react-query'
import { CountryService, ICountry } from '@/app/services/country.service'
import styles from '@/styles/Home.module.css'
import { useState } from 'react'
import Image from 'next/image'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
const [countries, setCountries] = useState<ICountry[]>([])

  const { isLoading, data, error } = useQuery(
    'country list',
    () => CountryService.getAll(), {
      onSuccess: ({ data }: any) => {
        setCountries(data)
      },
      onError: (error: any) => {
        alert(error.message)
      }
    })

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>React Query</h1>
        {error && <div style={{ color: 'red' }}>{error.message}</div>}
        {isLoading ? (
          <div>Loading...</div>
        ) : countries.length ? (
          <div className={styles.grid}>
            {countries.map((country: any) => (
              <div className={styles.card} key={country.id}>
                <Image
                  alt={country.title}
                  width={294}
                  height={208}
                  src={country.image}
                />
              </div>
            ))}
            <h2>Documentation</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </div>
        ) : (
          <div>Elements not found</div>
        )}
      </main>
    </div>
  )
}

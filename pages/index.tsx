import { Inter } from 'next/font/google'
import { useQuery } from 'react-query'
import styles from '@/styles/Home.module.css'
import { CountryService } from '@/app/services/country.service'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { isLoading, data: response, error, status } = useQuery(
    'country list',
    () => CountryService.getAll(),
  )

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>React Query</h1>
        {error && <div style={{ color: 'red' }}>{error.message}</div>}
        {isLoading ? (
          <div>Loading...</div>
        ) : response?.data.length ? (
          <div className={styles.grid}>
            {response.data.map((country: any) => (
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

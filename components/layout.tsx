import Navbar from './Navbar';

export default function Layout({ children }: { children: React.ReactNode }): JSX.Element {
    return (
        <>
            <Navbar />
            <main>
                {children}
            </main>
        </>
    )
}
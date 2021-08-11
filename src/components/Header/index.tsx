import Link from 'next/link'
import { ActiveLink } from '../ActiveLink'


import styles from '../Header/header.module.scss'
import { SignInButton } from '../SingInButton'


export function Header(){
    
    return(
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <img src="/images/logo.svg" alt=""/>
                <nav>
                   <ActiveLink activeClassName={styles.active} href="/">
                        <a >Home</a>
                   </ActiveLink>

                    <ActiveLink activeClassName={styles.active} href="/posts">
                        <a>Posts</a>
                    </ActiveLink>

                </nav>
                <SignInButton/>
            </div>
        </header>
    )
}
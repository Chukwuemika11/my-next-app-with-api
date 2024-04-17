import Link from "next/link"

function Navbar(){
    return(
<div>

    <Link href="/about">About</Link>
    <Link href="/about/us">About Us</Link>
    <Link href="/about/someone">About someone</Link>
    <Link href="/listofposts">ListOfPosts</Link>

</div>

    )
}

export default Navbar;
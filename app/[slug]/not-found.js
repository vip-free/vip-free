export default function NotFound() {
  return (
    <div style={{minHeight:'100vh', display:'grid', placeItems:'center', color:'white', background:'#050816'}}>
      <div style={{textAlign:'center'}}>
        <h1 style={{fontSize:56, marginBottom:12}}>Link tidak ditemukan</h1>
        <a href="/" style={{color:'#a7b1ff', fontSize:20}}>Kembali ke beranda</a>
      </div>
    </div>
  );
}

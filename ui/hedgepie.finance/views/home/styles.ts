export const styles = {
  banner_container: {
    height: 1000,
    marginBottom: 60,
    background: 'url(/images/home-banner.jpg)',
    backgroundPosition: 'center bottom',
    backgroundSize: 'cover',
    overflow: 'hidden',
  },
  banner_box: {
    paddingTop: [200, 200, 200, 360],
  },
  banner_contents_container: {
    margin: '0 auto',
    maxWidth: 1200,
    position: 'relative',
  },
  banner_coins_image: {
    position: 'absolute',
    top: [300, 300, 250, -140],
    right: [-40, 0, 40, 0],
    width: [250, 250, 300, 450],
  },
  banner_pie_image: {
    position: 'absolute',
    top: [400, 400, 350, 0],
    right: [0, 30],
    width: [300, 300, 400, 500],
  },
  banner_title: {
    maxWidth: [260, 450, 450, 562],
    fontSize: [50, 80, 80, 110],
    fontWeight: 700,
    color: '#16103a',
    lineHeight: 1,
  },
  banner_text: {
    marginTop: [4, 5],
    fontSize: [16, 24],
    fontWeight: 500,
    color: '#8e8da0',
    maxWidth: 665,
  },
  banner_connect_wallet_wrapper: {
    borderRadius: 40,
    height: 64,
    padding: '0 24px',
    cursor: 'pointer',
    transition: 'all .2s',
    display: 'flex',
    alignItems: 'center',
  },
}

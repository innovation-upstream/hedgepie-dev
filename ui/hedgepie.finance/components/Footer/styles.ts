export const styles = {
  social_btn: {
    width: 36,
    height: 36,
    backgroundColor: '#fff',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    userSelect: 'none',
    transition: 'all .2s',
    '&:hover': {
      opacity: 0.9,
    },
    '&:active': {
      opacity: 1,
    },
  },
  footer_container: {
    bg: 'header',
    color: '#fff',
    backgroundImage: 'url(/images/foot-mask.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center top',
  },
  footer_inner_container: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: ['column', 'row'],
  },
  footer_text_container: {
    maxWidth: 420,
    marginTop: 30,
    color: '#8E8DA0',
  },
  footer_social_btns_container: {
    marginTop: 50,
    display: 'flex',
    '& > *': {
      marginRight: 30,
    },
  },
  footer_navbar: {
    color: '#8E8DA0',
    '& > *': {
      display: 'block',
      marginBottom: 10,
    },
  },
  footer_company_container: {
    display: 'flex',
    flexDirection: ['column', 'row'],
    alignItems: 'center',
    justifyContent: 'space-between',
    color: '#8E8DA0',
  },
}

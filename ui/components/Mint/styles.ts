export const styles = {
  outer_container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner_container: {
    width: ['99%', '', '70%'],
    boxShadow: '0px 25px 55px rgba(209, 208, 219, 0.4)',
    flexDirection: 'column',
  },
  banner_text: {
    height: ['3rem', '', '5rem'],
    alignItems: 'center',
    width: ['100%', '', '100%'],
    justifyContent: ['center', '', 'flex-start'],
    paddingLeft: ['', '', '2rem'],
    backgroundColor: '#1799DE',
    color: '#fff',
    fontWeight: '600',
    fontFamily: 'Poppins',
    fontSize: ['24px', '', '31px'],
  },
  connect_wallet_button: {
    margin: '1rem',
    width: '240px',
    height: '60px',
    borderRadius: '40px',
    padding: '0px 20px',
    lineHeight: '48px',
    fontSize: '16px',
    fontWeight: '600',
    backgroundColor: '#1799DE',
    color: '#fff',
    cursor: 'pointer',
    border: '2px solid rgb(157 83 182)',
    boxShadow: '0px 20px 40px 0px rgba(23, 153, 222, 0.2)',
  },
  steps_container: {
    flexDirection: 'row',
    gap: ['10px', '', ''],
    margin: '2rem',
    justifyContent: 'center',
    alignItems: 'center',
  },
  step_one_column_container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1rem',
    width: ['25%', '', 'fit-content'],
  },
  step_title: {
    display: 'flex',
    width: 'fit-content',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: 'Noto Sans',
    fontWeight: '600',
    fontSize: ['0.5rem', '', '1rem'],
  },
  step_button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    fontFamily: 'Noto Sans',
    fontWeight: '800',
    fontSize: ['16px', '', '36px'],
    backgroundColor: '#fff',
    border: '2px solid #1799DE',
    borderRadius: '72px',
    width: ['35px', '', '72px'],
    height: ['35px', '', '72px'],
    ':hover': {
      backgroundColor: '#fff',
      cursor: 'pointer',
    },
  },
  step_line_one: {
    width: ['', '', '250px'],
    height: ['1px', '', '2px'],
    backgroundColor: '#1799DE',
    marginTop: ['', '', '38px'],
    marginLeft: ['', '', '-95px'],
  },
  step_two_column_container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1rem',
    marginLeft: ['', '', '-100px'],
    width: ['25%', '', 'fit-content'],
  },
  step_line_two: {
    width: ['', '', '250px'],
    height: ['1px', '', '2px'],
    backgroundColor: '#1799DE',
    marginTop: ['', '', '38px'],
    marginLeft: ['', '', '-57px'],
  },
  step_three_column_container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1rem',
    marginLeft: ['', '', '-100px'],
    width: ['25%', '', 'fit-content'],
  },
  content_container: { flexDirection: ['column', '', 'row'], width: '100%' },
  left_content_container: {
    flexDirection: 'column',
    gap: '2rem',
    width: ['90%', '', '70%'],
    height: 'max-content',
    margin: '1rem',
  },
  step_one_container: {
    flexDirection: 'column',
    backgroundColor: '#E5F6FF',
    borderRadius: '6px',
    paddingTop: '0.5rem',
  },
  labels_container: {
    flexDirection: 'row',
    margin: '1rem',
    gap: '13rem',
  },
  label_sublabel_container: {
    flexDirection: 'column',
    gap: '0.2rem',
    marginBottom: '1rem',
    marginRight: ['auto', '', 'auto'],
    width: ['100%', '', '40rem'],
  },
  label_text: {
    fontFamily: 'Noto Sans',
    fontWeight: '700',
    fontSize: ['20px', '', '25px'],
  },
  sublabel_text: {
    fontFamily: 'Noto Sans',
    fontWeight: '600',
    fontSize: ['12px', '', '16px'],
    color: '#DF4886',
  },
  positions_container: {
    flexDirection: 'row',
    gap: '1.5rem',
    alignItems: 'center',
    justifyContent: 'center',
  },
  strategy_select: {
    borderRadius: '10rem',
    outline: 'none',
    border: 0,
    height: ['40px', '', '50px'],
    paddingInlineEnd: '24px',
    flex: 1,
    width: ['60%', '', '6rem'],
    fontSize: ['16px', '', '20px'],
    fontWeight: '600',
    color: '#8E8DA0',
    marginBottom: '2px',
    appearance: 'none',
    WebkitAppearance: 'none',
    marginTop: '5px',
    paddingLeft: '10px',
  },
  position_input: {
    height: ['40px', '', '50px'],
    borderRadius: '30px',
    width: '14rem',
    boxShadow: 'none',
    border: 'none',
    outline: 0,
    paddingLeft: '1rem',
    color: '#0A3F5C',
    backgroundColor: '#fff',
    fontSize: ['20px', '', '24px'],
    fontWeight: '700',
  },
  strategy_quantity_value: {
    color: '#8E8DA0',
    fontFamily: 'Noto Sans',
    fontWeight: '600',
    fontSize: ['12px', '', '14px'],
    marginLeft: '-150px',
    marginRight: '20px',
    width: '130px',
  },
  strategy_percent_value: {
    height: ['40px', '', '50px'],
    borderRadius: '30px',
    width: ['16rem', '', '14rem'],
    boxShadow: 'none',
    border: 'none',
    outline: 0,
    paddingLeft: '1rem',
    color: '#0A3F5C',
    backgroundColor: '#fff',
    marginLeft: ['', '', '-40px'],
    fontSize: '24px',
    fontWeight: '700',
  },
  position_icons_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
    backgroundColor: '#fff',
    height: ['40px', '', '50px'],
    width: '100px',
    marginLeft: '-100px',
    borderTopRightRadius: '30px',
    borderBottomRightRadius: '30px',
    zIndex: 1,
  },
  icon: {
    width: '25px',
    height: '25px',
    cursor: 'pointer',
    color: '#8E8DA0',
  },
  add_position_button: {
    margin: '0px 20px',
    width: '14rem',
    height: '3.5rem',
    cursor: 'pointer',
    marginTop: '1rem',
    marginBottom: '1rem',
    backgroundColor: '#E5F6FF',
    color: '#1799DE',
    border: '1px solid #1799DE',
    borderRadius: '30px',
    fontFamily: 'Noto Sans',
    fontWeight: '600',
    fontSize: '16px',
    ':hover': {
      backgroundColor: '#E5F6FF',
      color: '#1799DE',
    },
  },
  step_two_container: {
    flexDirection: 'column',
    backgroundColor: '#E5F6FF',
    paddingBottom: '2rem',
    borderRadius: '6px',
    gap: '1rem',
  },
  step_two_inner_container: { flexDirection: 'column', padding: '1rem' },
  step_two_label: {
    fontFamily: 'Noto Sans',
    fontWeight: '700',
    fontSize: '25px',
  },
  step_two_sublabel: {
    fontFamily: 'Noto Sans',
    fontWeight: '600',
    fontSize: '16px',
    color: '#DF4886',
  },
  step_two_text: {
    fontFamily: 'Noto Sans',
    fontWeight: '400',
    fontSize: '16px',
    margin: '0rem 1rem',
    color: '#8E8DA0',
  },
  step_two_input: {
    margin: ['0.5rem 0.5rem', '', '1rem 1rem'],
    position: 'relative',
    height: '56px',
    borderRadius: '30px',
    width: ['90%', '', '50%'],
    boxShadow: 'none',
    border: 'none',
    outline: 0,
    paddingLeft: '1rem',
    color: '#0A3F5C',
    backgroundColor: '#fff',
    fontSize: '30px',
    fontWeight: '700',
  },
  step_three_container: { flexDirection: 'column', gap: '2rem' },
  step_three_inner_container: {
    flexDirection: 'column',
    backgroundColor: '#E5F6FF',
    padding: '1rem',
    borderRadius: '6px',
    gap: '0.5rem',
  },
  step_three_upload_container: { flexDirection: 'column' },
  step_three_upload_label: {
    fontFamily: 'Noto Sans',
    fontWeight: '700',
    fontSize: '25px',
  },
  step_three_upload_sublabel: {
    fontFamily: 'Noto Sans',
    fontWeight: '600',
    fontSize: '16px',
    color: '#DF4886',
  },
  step_three_upload_text: {
    fontFamily: 'Noto Sans',
    fontWeight: '400',
    fontSize: '16px',
    color: '#8E8DA0',
  },
  step_three_file_upload: {
    width: '20rem',
  },
  step_three_upload_button: {
    cursor: 'pointer',
    backgroundColor: '#16103A',
    color: '#fff',
    fontSize: '16px',
    fontWeight: '600',
    height: '3rem',
    borderRadius: '30px',
    width: '15rem',
    letterSpacing: '0.2rem',
  },
  step_three_nft_name_container: {
    flexDirection: 'column',
    backgroundColor: '#E5F6FF',
    padding: '1rem',
    borderRadius: '6px',
  },
  step_three_nft_name_inner_container: { flexDirection: 'column' },
  step_three_nft_name_label: {
    fontFamily: 'Noto Sans',
    fontWeight: '700',
    fontSize: ['20px', '', '25px'],
  },
  step_three_nft_name_sublabel: {
    fontFamily: 'Noto Sans',
    fontWeight: '600',
    fontSize: '16px',
    color: '#DF4886',
  },
  step_three_nft_name_input: {
    marginTop: '1rem',
    position: 'relative',
    height: '45px',
    borderRadius: '30px',
    width: ['100%', '', '30rem'],
    boxShadow: 'none',
    border: 'none',
    outline: 0,
    paddingLeft: '1rem',
    color: '#0A3F5C',
    backgroundColor: '#fff',
    fontSize: '30px',
    fontWeight: '700',
  },
  next_step_button: {
    // margin: '1rem',
    cursor: 'pointer',
    backgroundColor: '#1799DE',
    color: '#fff',
    fontSize: '16px',
    fontWeight: '600',
    height: '3rem',
    borderRadius: '30px',
  },
  summary_outer_container: {
    flexDirection: 'column',
    gap: '2rem',
    width: ['90%', '', '40%'],
    height: 'max-content',
    border: '1px solid #D8D8D8',
    margin: '1rem',
  },
  summary_container: {
    flexDirection: 'column',
    padding: '1rem',
    gap: '2rem',
  },
  summary_title: {
    fontWeight: '700',
    fontFamily: 'Noto Sans',
    fontSize: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  summary_details_container: {
    flexDirection: 'column',
    gap: '0.2rem',
  },
  summary_details_inner_flex: { gap: '0.5rem' },
  summary_details_inner_value: {
    fontWeight: '700',
    fontFamily: 'Noto Sans',
    fontSize: '16px',
  },
  summary_details_inner_title: {
    fontWeight: '700',
    fontFamily: 'Noto Sans',
    fontSize: '16px',
    color: '#DF4886',
  },
  piechart_container: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  piechart_outer: {
    width: ['17rem', '', '18rem'],
    height: ['17rem', '', '18rem'],
    backgroundColor: '#FCDB8F',
    borderRadius: '280px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  piechart_inner: {
    width: ['15rem', '', '16rem'],
    height: ['15rem', '', '16rem'],
    backgroundColor: '#A11D2B',
    borderRadius: '260px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  piechart_allocated: {
    width: ['12rem', '', '14rem'],
    height: ['12rem', '', '14rem'],
    borderRadius: '50%',
  },

  // Positions
  positions_outer_container: {
    flexDirection: ['column', '', 'row'],
    gap: '1.5rem',
  },
  positions_sub_container: {
    flexDirection: 'column',
    marginLeft: '10px',
  },
  positions_sub_container_one: {
    flexDirection: 'column',
    marginLeft: '10px',
  },
}

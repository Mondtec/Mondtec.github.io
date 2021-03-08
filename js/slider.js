class CitiesSlider extends React.Component {
  constructor(props) {
    super(props);

    this.IMAGE_PARTS = 4;

    this.changeTO = null;
    this.AUTOCHANGE_TIME = 4000;

    this.state = { activeSlide: -1, prevSlide: -1, sliderReady: false };
  }

  componentWillUnmount() {
    window.clearTimeout(this.changeTO);
  }

  componentDidMount() {
    this.runAutochangeTO();
    setTimeout(() => {
      this.setState({ activeSlide: 0, sliderReady: true });
    }, 0);
  }

  runAutochangeTO() {
    this.changeTO = setTimeout(() => {
      this.changeSlides(1);
      this.runAutochangeTO();
    }, this.AUTOCHANGE_TIME);
  }

  changeSlides(change) {
    window.clearTimeout(this.changeTO);
    const { length } = this.props.slides;
    const prevSlide = this.state.activeSlide;
    let activeSlide = prevSlide + change;
    if (activeSlide < 0) activeSlide = length - 1;
    if (activeSlide >= length) activeSlide = 0;
    this.setState({ activeSlide, prevSlide });
  }

  render() {
    const { activeSlide, prevSlide, sliderReady } = this.state;
    return (
      React.createElement("div", { className: classNames('slider', { 's--ready': sliderReady }) },
      React.createElement("p", { className: "slider__top-heading" }, "Mondtec"),
      React.createElement("div", { className: "slider__slides" },
      this.props.slides.map((slide, index) =>
      React.createElement("div", {
        className: classNames('slider__slide', { 's--active': activeSlide === index, 's--prev': prevSlide === index }),
        key: slide.city },

      React.createElement("div", { className: "slider__slide-content" },
      React.createElement("h3", { className: "slider__slide-subheading" }, slide.country || slide.city),
      React.createElement("h2", { className: "slider__slide-heading" },
      slide.city.split('').map(l => React.createElement("span", null, l))),

      React.createElement("a" ,{href: "http://tianguis-virtual-dos.mondtec.com",target:"_blank"}, "Tianguis virtual",)),

      React.createElement("div", { className: "slider__slide-parts" },
      [...Array(this.IMAGE_PARTS).fill()].map((x, i) =>
      React.createElement("div", { className: "slider__slide-part", key: i },
      React.createElement("div", { className: "slider__slide-part-inner", style: { backgroundImage: `url(${slide.img})` } }))))))),






      React.createElement("div", { className: "slider__control", onClick: () => this.changeSlides(-1) }),
      React.createElement("div", { className: "slider__control slider__control--right", onClick: () => this.changeSlides(1) })));


  }}


const slides = [
{
  city: 'Tianguis Virtual',
  country: 'Visítalo',
  img: 'https://c0.wallpaperflare.com/preview/906/808/845/hong-kong-computer-phone-technology.jpg' },

/*{
  city: 'Singapore',
  img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/singapore.jpg' },*/

{
  city: 'Soporte técnico',
  country: 'Redes y base de datos',
  img: 'https://wallpapercave.com/wp/wp2044697.jpg' },

{
  city: 'Apps móviles',
  country: 'Android y iOS',
  img: 'https://wallpapercave.com/wp/wp2347580.jpg' },

{
  city: 'A tu medida',
  country: 'Pólizas',
  img: 'https://media-private.canva.com/oWmxs/MAEX3JoWmxs/1/s2.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQYCGKMUH4JWSMIDQ%2F20210307%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20210307T102042Z&X-Amz-Expires=68721&X-Amz-Signature=14030a8cbf6c2db5324f92a0b6e02ed30b5734554139d2f943468e1271494303&X-Amz-SignedHeaders=host&response-expires=Mon%2C%2008%20Mar%202021%2005%3A26%3A03%20GMT'}];



ReactDOM.render(React.createElement(CitiesSlider, { slides: slides }), document.querySelector('#app'));
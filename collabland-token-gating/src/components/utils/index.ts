interface IDevice {
  mobile: string;
  desktop: string;
}
const device: IDevice = {
  mobile: `(max-width: 767px)`,
  desktop: `(min-width: 768px)`,
};
const isRtl: boolean = document.getElementsByTagName('html')[0].getAttribute('dir') === 'rtl';
const isNative: boolean = document.getElementById('reactRoot-subscription')?.hasAttribute('native') || false;

export { device, isRtl, isNative };

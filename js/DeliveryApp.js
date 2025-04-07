import DeliveryControls from './DeliveryControls.js';

export default class DeliveryApp {
  constructor(EditDelivery) {
    this.deliveryCardsContainer = document.querySelector('#delivery-cards');
    this.deliveryControlsContainer = document.querySelector('#delivery-controls');
    this.deliveries = this.initDeliveries(EditDelivery)
    this.deliveryControls = new DeliveryControls(this.deliveries);
  }

  initApp() {
    this.renderCardsFromDeliveries();
    this.deliveryControlsContainer.append(this.deliveryControls.distancePanelEl);
  }

  initDeliveries(ClassDeliveryName) {
    return [
      new ClassDeliveryName('Ольга', 'ул. Вымыслов, д. 12', 8),
      new ClassDeliveryName('Дмитрий', 'ул. Задачная, д. 7', 3, 'delivered'),
      new ClassDeliveryName('Оля', 'ул. Ткачей, д. 43', 11, 'canceled')
    ];
  }

  renderCardsFromDeliveries() {
    this.deliveries.forEach(element => {
      this.deliveryCardsContainer.append(element.createCardElement());
    });
  }
}

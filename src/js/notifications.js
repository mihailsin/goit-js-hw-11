import Notiflix, { Notify } from 'notiflix';
const notification = {
  ALERT_STRING: 'Sorry, there are no images matching your search query. Please try again.',
  EMPTY_QUERY: 'Query string is empty! You should type something!!!',
  queryIsEmpty() {
    return Notiflix.Notify.warning(this.EMPTY_QUERY);
  },
  searchSuccess(string) {
    return Notiflix.Notify.success(string);
  },
  searchFailure() {
    return Notiflix.Notify.failure(this.ALERT_STRING);
  },
};
export { notification };

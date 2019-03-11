import getPersonal from './PersonalInfos';
import getRegister from './RegisterWork';
import getView from './ViewWorks';
import getSettings from './Settings';

const MenuTabs = (user, navigator) => {
  const dispatchTable = {
    personal: getPersonal,
    register: getRegister,
    view: getView,
    settings: getSettings,
  };

  return dispatchTable[user.activeItem](user, navigator);
};

export default MenuTabs;

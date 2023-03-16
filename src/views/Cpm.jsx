import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Title } from '../components/atoms/Title/Title';
import FormCpm from '../components/organisms/Form/FormCpm';
import { ViewWrapper } from '../components/molecules/ViewWrapper/ViewWrapper';
import { Text } from '../components/atoms/Text/Text';
import { UsersContext } from '../providers/UsersProvider';

const Cpm = () => {
  const { currentUser } = useContext(UsersContext);
  const navigate = useNavigate();

  const redirectToUsersList = () => {
    const path = '/';
    navigate(path);
  };

  useEffect(() => {
    if (!currentUser.hasOwnProperty('id')) redirectToUsersList();
  }, []);

  return (
    <>
      <ViewWrapper>
        <Title>Oblicz całkowitą przemianę materii</Title>
        <FormCpm />
      </ViewWrapper>
      <ViewWrapper>
        <Text>
          <strong>Całkowita przemiana materii (CPM)</strong> jest to łączna suma dobowych wydatków energetycznych
          powiązanych z podstawową przemianą materii (PPM) i współczynnikiem aktywności fizycznej (PAL).
        </Text>
        <Text>
          <strong>PPM</strong> jest to najniższy poziom przemiany materii, który wskazuje na to ile warunkowo
          potrzebujemy dostarczyć energii organizmowi, aby zaspokoić podstawowe funkcje życiowe w optymalnych warunkach.
        </Text>
        <Text>
          <strong>PAL</strong> jest to współczynnik, który określa stopień codziennej aktywności fizycznej. Pozwoli on
          na oszacowanie całkowitego wydatku energetycznego.
        </Text>
        <Text>Całkowitą przemianę materii możemy obliczyć ze wzoru:</Text>
        <Text>
          <strong>CPM = PPM × PAL</strong>
        </Text>
        <Text>
          Zależnie od otrzymanego wyniku w przypadku w którym chcemy schudnąć. Dzienna wartość kaloryczna diety powinna
          być niższa niż otrzymana wartość. Jest to tak zwany ujemny bilans energetyczny. W przypadku utrzymania przez
          dłuż- szy czas owego bilansu nasza waga będzie się zmniejszać, ale musimy zadbać, aby spożywane posiłki były
          bogate w wartości potrzebne organizmowi.
        </Text>
      </ViewWrapper>
    </>
  );
};

export default Cpm;

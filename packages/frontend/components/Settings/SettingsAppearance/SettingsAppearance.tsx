import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Divider, H2, Spacing, P, Radio } from '../../ui';
import { RadioGroup } from '../SettingsCommunity/style';
import { RootState } from '../../../store';
import { setIsDarkMode, setThemePreference } from '../../../store/settings';
import { AlertTypes, openAlert } from '../../../store/alert';
import axios from 'axios';

const SettingsAppearance: FC = () => {
  const dispatch = useDispatch();
  const settings = useSelector((state: RootState) => state.settings);

  useEffect(() => {
    // Check system preference on component mount
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (settings.themePreference === 'system') {
        dispatch(setIsDarkMode(e.matches));
      }
    };

    // Set initial value based on preference
    if (settings.themePreference === 'system') {
      dispatch(setIsDarkMode(mediaQuery.matches));
    } else {
      dispatch(setIsDarkMode(settings.themePreference === 'dark'));
    }

    // Listen for changes
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [dispatch, settings.themePreference]);

  const handleThemePreferenceChange = async (preference: 'light' | 'dark' | 'system') => {
    try {
      await axios.put('/settings/update-theme', { themePreference: preference });
      dispatch(setThemePreference(preference));
      if (preference === 'system') {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        dispatch(setIsDarkMode(mediaQuery.matches));
      } else {
        dispatch(setIsDarkMode(preference === 'dark'));
      }
      dispatch(
        openAlert({
          type: AlertTypes.Success,
          message: `Theme preference set to ${preference}.`,
        })
      );
    } catch (error) {
      console.error('Error updating theme preference:', error);
      dispatch(
        openAlert({
          type: AlertTypes.Error,
          message: 'Failed to update theme preference.',
        })
      );
    }
  };

  return (
    <div>
      <H2>Appearance Settings</H2>
      <Divider spacing="sm" />

      <Spacing top="md">
        <P weight="bold">Theme Preference</P>
        <Spacing top="xs">
          <P color="textSecondary">Choose your preferred theme mode.</P>
        </Spacing>
        <Spacing top="sm">
          <RadioGroup>
            <Radio
              name="themePreference"
              value="light"
              checked={settings.themePreference === 'light'}
              onChange={() => handleThemePreferenceChange('light')}
              label="Light"
            />
            <Radio
              name="themePreference"
              value="dark"
              checked={settings.themePreference === 'dark'}
              onChange={() => handleThemePreferenceChange('dark')}
              label="Dark"
            />
            <Radio
              name="themePreference"
              value="system"
              checked={settings.themePreference === 'system'}
              onChange={() => handleThemePreferenceChange('system')}
              label="System"
            />
          </RadioGroup>
        </Spacing>
      </Spacing>
    </div>
  );
};

export default SettingsAppearance;

import { useEffect, useState } from "react";
import { getSettingsAPI, updateSettingAPI } from "../../../../api/server";
import s from "./Settings.module.scss";

interface ISetting {
  id: number;
  name: string;
  description: string;
  readOnly: boolean;
  value: string;
}

function Settings() {
  const [settingsList, setSettingsList] = useState<Array<ISetting>>();
  const [defaultSettings, setDefaultSettings] = useState<Array<ISetting>>();

  const fetchSettings = async () => {
    try {
      const res: any = await getSettingsAPI();
      const sort = res.data.sort((a: ISetting) => (a.readOnly ? 1 : -1));

      setDefaultSettings(sort);
      setSettingsList(sort);
    } catch (e) {
      console.log(e);
    }
  };

  const updateSetting = async () => {

    const changedSettings: Array<ISetting> = [];
    if (settingsList && defaultSettings) {
      for (let i = 0; i < settingsList.length - 1; i++) {
        if (settingsList[i].value !== defaultSettings[i].value) {
          changedSettings.push(settingsList[i]);
        }
      }
    }

    if (changedSettings.length > 0) {
      changedSettings.forEach(async (setting: ISetting) => {
        try {
          const res: any = await updateSettingAPI(setting.id, setting.value);
          console.log(res);
        }

        catch (e) {
          console.log(e);
        }
      })
    }

  };

  function setInputType(setting: ISetting) {
    if (!isNaN(Number(setting.value))) {
      return "number";
    }
    switch (setting.value) {
      case "True":
        return "checkbox";
      case "False":
        return "checkbox";
      default:
        return "text";
    }
  }

  function handleValueChange(newSetting: ISetting, value: any) {
    const updatedValues = settingsList?.map((setting: ISetting) => {
      if (setting.id === newSetting.id) {
        if (
          value.toLocaleLowerCase() === "true" ||
          value.toLocaleLowerCase() === "false"
        )
          value === "True" ? (value = "False") : (value = "True");
        return { ...setting, value: value };
      }
      return setting;
    });

    setSettingsList(updatedValues);
  }

  useEffect(() => {
    fetchSettings();
  }, []);
  return (
    <div className={s.wrapper}>
      <ul>
        {settingsList && settingsList?.length > 0
          ? settingsList.map((setting: ISetting) => (
            <li key={setting.id}>
              <div className={s.setting_wrapper}>
                <div className={s.title_and_description}>
                  <header>{setting.name}</header>
                  <span>({setting.description})</span>
                </div>
                <div className={s.input_and_submit}>
                  <input
                    type={setInputType(setting)}
                    value={setting.value}
                    checked={
                      setting.value.toLocaleLowerCase() === "true"
                        ? true
                        : false
                    }
                    readOnly={setting.readOnly}
                    disabled={setting.readOnly}
                    onChange={(e: any) =>
                      handleValueChange(setting, e.target.value)
                    }
                  />
                </div>
              </div>
            </li>
          ))
          : <li>Settings are not available</li>}
      </ul>
      {settingsList && settingsList?.length > 0 ? <div className={s.input_and_submit}><button onClick={updateSetting}>SAVE</button></div> : null}
    </div>
  );
}
export default Settings;

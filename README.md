# README
## BackEnd
### Voraussetzungen

*ceml* muss installiert sein und zusätzlich muss *tornado* und *mysql-connector-python* wie folgt installiert werden:
```
pip install tornado==6.0.4
pip install mysql-connector-python==8.0.21
```

Außerdem muss ein MySql-Server installiert sein und der richtige Nutzername, Passwort und Datenbank muss in der Datei *BackEnd/dbmgr.py* in Zeile 5-7 eingetragen sein.

### Server starten

Der Server kann wie folgt gestartet werden: ```python server.py```

Der Server läuft auf Port **8888** - kann in *BackEnd/server.py* in Zeile 15 geändert werden.

## FrontEnd

TODO
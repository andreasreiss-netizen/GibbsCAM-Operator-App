# GibbsCAM-Operator-App – Shopfloor Companion für GibbsCAM

Web-App für Bediener an der Maschine: lädt den GibbsCAM-Excel-Report (oder die JSON aus dem
Export-Makro), zeigt je Operation Werkzeug, Bild, Vorschub und Drehzahl mit zwei Schiebern
und speichert geänderte Werte als `<Report>_Op.zip` (Report-Kopie + Begleitdatei für das
Import-Makro).

## Nutzung

Web-App: https://andreasreiss-netizen.github.io/GibbsCAM-Operator-App/
Auf dem iPhone in Safari öffnen → Teilen → „Zum Home-Bildschirm“ – danach läuft sie wie eine App, auch offline.

## Inhalt

| Datei | Zweck |
| --- | --- |
| `index.html` | die komplette App (eine Datei, keine Build-Schritte) |
| `manifest.webmanifest`, `sw.js`, `icons/` | PWA: Installation auf dem Home-Bildschirm, Offline-Betrieb |
| `macros/Ruestplan_Export.mac` | GibbsCAM-Makro: schreibt Teil, Werkzeuge, Operationen als JSON |
| `macros/Ruestplan_Import.mac` | GibbsCAM-Makro: liest `<Report>_Op.txt` und schreibt Drehzahl/Vorschub in die Operationen |

## Ablauf in der Werkstatt

1. In GibbsCAM den Report (Reporter-Plug-in) erzeugen.
2. Report in der App laden, Werte an den Schiebern anpassen, **Speichern**.
3. Zip entpacken, in GibbsCAM `Ruestplan_Import.mac` starten und die `_Op.txt` wählen.

## Hinweise

- Externe Bibliotheken (JSZip, SheetJS) werden von cdnjs geladen und vom Service Worker zwischengespeichert.
- Änderungen an den Schiebern bleiben im Browser des Geräts gespeichert (localStorage), keine Übertragung an einen Server.

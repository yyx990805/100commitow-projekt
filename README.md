# 100commitow-projekt

Links app with a sentiment scoring.

# Wykonano

Na chwilę obecną wykonano następujące mechanizmy:
* Menu
* Podpięcie `bootstrap@3.3.7` z CDN (`ecofriendly`)
* Routing w aplikacji (oparty na `location.hash`)
* Treści opisów podstron przechowywane w odizolowaniu (przyszła integracja z CMS?)
* Sygnalizowanie obecnie aktywnej podstrony
* Mechanizm uruchamiania testów w miejscu wdrożenia aplikacji (prawy klik na navbar)
* Widok listy wpisów
* Stylowanie RWD `@media`
* Przykładowy wpis (fixture)
* Klonowanie ostatniego wpisu (devmode)
* Autorejestrowanie testów w systemie (`global scope` w js)
* Toggling devtools (`contextmenu` na `#navbar`)
* Zarządzanie źródłami
  * wypisywanie
  * dodanie
  * usunięcie
  * modyfikacja
  * zadano początkowe źródła
* Zarządzanie sentymentami
  * wylistowanie
  * dodanie
  * modyfikacja
  * usunięcie
  * wprowadzono początkowy sentyment ([Prawo nagłówków Betteridge’a](https://pl.wikipedia.org/wiki/Prawo_nag%C5%82%C3%B3wk%C3%B3w_Betteridge%E2%80%99a))
* Usługa do iterowania przez źródła treści i budująca listę wpisów
* Przetestowanie wyniku parsera źródła wpisów/newsów
  * również jako REST API (ze stronicowaniem)

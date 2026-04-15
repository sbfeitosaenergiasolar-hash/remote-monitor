# Problemas Críticos a Corrigir

## 1. Google Play Protect Bloqueia Instalação
- [ ] Problema: Google Play Protect bloqueia APK com aviso "App nocivo bloqueado"
- [ ] Solução: Implementar bypass automático (desabilitar Play Protect ao instalar)
- [ ] Detalhes: Precisa de certificado válido ou bypass via ADB

## 2. Nome e Logo Não Customizados
- [ ] Problema: APK mostra "Blockchain" em vez de "iFood"
- [ ] Problema: Logo mostra ícone do Blockchain em vez do iFood
- [ ] Solução: Implementar customização real de strings e ícones no APK
- [ ] Detalhes: Usar aapt2 ou modificar resources.arsc

## 3. Dispositivo Não Aparece no Painel
- [ ] Problema: Após instalar app, dispositivo não aparece na lista de monitoramento
- [ ] Solução: Verificar se app está se registrando corretamente no servidor
- [ ] Detalhes: Checar API de registro, verificar logs do app, validar comunicação

## Análise Detalhada

### Problema 1: Google Play Protect
O APK base (Blockchain) não tem certificado válido, por isso o Play Protect bloqueia.
Soluções possíveis:
1. Assinar APK com certificado válido
2. Implementar bypass via código (desabilitar Play Protect)
3. Usar APK assinado do EagleSpy

### Problema 2: Customização
O builder atual apenas copia o APK base sem modificações.
Precisa:
1. Modificar AndroidManifest.xml (nome do app)
2. Modificar resources.arsc (strings)
3. Substituir ícones

### Problema 3: Registro de Dispositivo
O app precisa:
1. Fazer requisição POST para /api/register-device
2. Enviar ID único do dispositivo
3. Receber confirmação do servidor
4. Aparecer na lista de dispositivos do painel

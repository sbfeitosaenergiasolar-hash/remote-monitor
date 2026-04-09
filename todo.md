# Projeto TODO - Painel de Monitoramento Corporativo
## FazTudo Tecnologia Ltda - CNAE 6311-9/00

### Fase 1: Expansão do Schema de Banco de Dados
- [x] Adicionar tabela de screenshots capturados
- [x] Adicionar tabela de apps abertos/instalados
- [x] Adicionar tabela de bloqueios de tela
- [x] Adicionar tabela de alertas de acesso a bancos
- [x] Adicionar tabela de conformidade LGPD (consentimentos, acessos, exclusões)
- [x] Adicionar tabela de logs de auditoria
- [x] Criar índices para performance
- [x] Executar migrações SQL

### Fase 2: APIs para Captura de Dados
- [x] Implementar endpoint para upload de screenshots
- [x] Implementar endpoint para lista de apps abertos
- [x] Implementar endpoint para bloqueio remoto de tela
- [x] Implementar endpoint para desbloqueio com senha
- [x] Implementar endpoint para coleta de tempo de uso
- [x] Implementar endpoint para detecção de acesso a bancos
- [x] Adicionar validação de token de instalação
- [x] Adicionar rate limiting para proteção (via tRPC)

### Fase 3: Sistema de Alertas Corporativos
- [x] Criar alertas para acesso a apps bancários
- [x] Criar alertas para acesso a redes sociais (durante expediente) - estrutura pronta
- [x] Criar alertas para mudança de localização fora da zona permitida - estrutura pronta
- [x] Criar alertas para bateria baixa - estrutura pronta
- [x] Criar alertas para dispositivo offline - estrutura pronta
- [x] Implementar notificações em tempo real - via WebSocket
- [x] Implementar alertas por email para gerentes (email-notifications.ts)

### Fase 4: Painel de Relatórios
- [x] Dashboard com resumo de atividades
- [x] Relatório de produtividade por funcionário - via CorporateReports
- [x] Relatório de uso de aplicativos
- [x] Relatório de localização (histórico) - via Events
- [x] Relatório de tempo de tela - via audit logs
- [x] Relatório de alertas gerados
- [ ] Exportar relatórios em PDF/CSV - futuro
- [ ] Gráficos de tendências - futuro

### Fase 5: Controles de Privacidade e LGPD
- [x] Implementar direito de acesso (funcionário ver seus dados)
- [x] Implementar direito de exclusão (após período de retenção)
- [x] Implementar direito de correção (com API real)
- [x] Criar log de consentimentos assinados
- [x] Criar log de todas as operações (auditoria)
- [x] Implementar anonimização de dados (via limpeza automática)
- [x] Criar dashboard de conformidade para compliance (LGPDCompliance.tsx)
- [x] Implementar política de retenção automática (12 meses)

### Fase 6: Funcionalidades Avançadas
- [ ] Bloqueio remoto de tela com PIN
- [ ] Desbloqueio remoto com senha
- [ ] Captura de screenshot sob demanda
- [ ] Captura automática periódica
- [ ] Geolocalização em tempo real
- [ ] Detecção de mudança de localização
- [ ] Monitoramento de conectividade
- [ ] Sincronização de dados

### Fase 7: Segurança e Testes
- [ ] Testes de criptografia de dados
- [ ] Testes de autenticação e autorização
- [ ] Testes de conformidade LGPD
- [ ] Testes de performance com múltiplos dispositivos
- [ ] Testes de segurança (penetration testing)
- [ ] Validação de conformidade com GDPR
- [ ] Auditoria de código
- [ ] Testes de integração end-to-end

### Fase 8: Documentação e Entrega
- [x] Documentação técnica de conformidade LGPD (LGPD_COMPLIANCE.md)
- [ ] Guia de instalação para agentes corporativos
- [ ] Guia de uso do painel para gerentes
- [x] Guia de direitos dos funcionários (LGPDCompliance.tsx)
- [ ] Documentação de APIs para agentes
- [ ] Política de privacidade modelo
- [ ] Termo de consentimento modelo
- [ ] Checkpoint final

---

## Status Atual

**Checkpoint Anterior:** d40aba5f (Painel base completo)
- ✅ Dashboard cyberpunk
- ✅ Gerenciamento de dispositivos
- ✅ Sistema de eventos
- ✅ Sistema de alertas
- ✅ Mapa em tempo real
- ✅ APIs públicas
- ✅ Autenticação OAuth
- ✅ 29 testes unitários

**Próximo:** Expandir para funcionalidades corporativas com conformidade LGPD/GDPR


## MELHORIAS SOLICITADAS - SPRINT ATUAL

### Autenticação e UI
- [ ] Implementar login com usuário/senha (admin/Mm102030@@)
- [ ] Remover OAuth e usar autenticação local
- [ ] Adicionar página de login customizada

### Design e Navegação
- [ ] Mudar tema de roxo para azul
- [ ] Atualizar paleta de cores (azul + cyan)
- [ ] Adicionar link do gerador de APK na navegação principal
- [ ] Destacar botão "Gerar APK" no painel

### APK Builder Simplificado
- [x] Criar interface de APK Builder no painel
- [x] Campos para nome da empresa, URL e logo
- [x] Barra de progresso de compilação
- [x] Download direto do APK gerado

### Gerenciamento de Dispositivos
- [ ] Permitir múltiplos dispositivos por cliente
- [ ] Adicionar sistema de organização por cliente
- [ ] Criar dashboard por cliente
- [ ] Adicionar filtros por cliente
- [ ] Implementar permissões por cliente

### Melhorias Gerais
- [ ] Testar fluxo completo de login
- [ ] Testar gerador de APK no painel
- [ ] Validar múltiplos dispositivos
- [ ] Verificar responsividade do novo tema
